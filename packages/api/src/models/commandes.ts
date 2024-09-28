import { knex } from "../../db";
import { getarticles, putArticleById } from "./articles";
import { getTickets } from "./tickets";
import { ArticlesUpd } from "./types/articles";
import {
  Commandes,
  CommandesHead,
  CommandesRows,
  CommandesUpd,
} from "./types/commandes";
import { TVA } from "../constants";

export const table = "commandes";

export const getCommandes = async () => {
  const results = await knex<Commandes>(table)
    .select("*")
    .leftJoin("articles", "articles.id", "commandes.id_article")
    .leftJoin("tickets", "tickets.id", "commandes.id_ticket");

  if (results && results.length) {
    return results;
  }
  return null;
};

const getLastNumber = async (): Promise<number> => {
  const results = await knex<Commandes>(table)
    .select("numero")
    .orderBy("numero", "desc");

  if (results && results.length > 0) {
    return results[0].numero;
  }

  return -1;
};

export const deleteCommandeById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createCommande = async (data: Commandes[]) => {
  const idArticleList: number[] = data
    .filter((item) => item.id_article !== undefined)
    .map((item) => item.id_article as number);

  const articleStockSubquery = knex("articles")
    .select("id", "article", "stock")
    .whereIn("id", idArticleList)
    .as("a");

  const diff = await knex
    .with("commandes_temp", (qb) => {
      qb.select("*").from(
        knex.raw(
          `(
              VALUES ${data
                .filter((item) => item.id_article !== undefined)
                .map(
                  (item) => `( ${item.id_article}, ${Number(item.quantite)})`
                )
                .join(", ")}
            ) AS t(id_article, quantite)`
        )
      );
    })
    .select(
      "a.id",
      "a.article",
      "a.stock as stock_quantite",
      "c.quantite as commandes_quantite",
      knex.raw("CAST(a.stock AS INTEGER) - c.quantite as difference")
    )
    .from(articleStockSubquery)
    .join("commandes_temp as c", "a.id", "c.id_article")
    .whereRaw("CAST(a.stock AS INTEGER) < c.quantite");

  if (diff && diff.length) {
    const outOfStockItems = diff.map((item) => ({
      article: item.article,
      diff: item.difference,
    }));

    return [-2, outOfStockItems];
  }

  //const lastNumber = await getLastNumber();

  const dataCommande: CommandesHead = data.reduce(
    (acc, item) => {
      acc.quantite = (acc.quantite ?? 0) + (item?.quantite ?? 0);
      const currentSum = item.prix * item.quantite;
      acc.somme = (acc.somme ?? 0) + currentSum;
      const currentTVA = item.prix * item.quantite * TVA;
      acc.tva = (acc.tva ?? 0) + currentTVA;
      return {
        ...acc,
        id_user: item.id_user ?? 1,
        // numero: lastNumber + 1,
        date: item.date,
        date_visite: item.date_visite,
      };
    },
    {
      id_user: 1,
      // numero: 0,
      date: new Date(),
      date_visite: new Date(),
      quantite: 0,
      somme: 0,
      tva: 0,
    }
  );

  dataCommande.somme = Number(dataCommande.somme.toFixed(2));
  dataCommande.tva = Number(dataCommande.tva.toFixed(2));

  const results: { id: number }[] = await knex<CommandesHead>(table)
    .insert(dataCommande)
    .returning("id");

  if (results) {
    const commandedId = Number(results[0].id);
    const dataRows: CommandesRows[] = data.map((item) => ({
      id_commande: commandedId,
      id_article: item.id_article,
      prix: item.prix,
      quantite: item.quantite,
      somme: Number((item.prix * item.quantite).toFixed(2)),
      tva: Number((item.prix * item.quantite * TVA).toFixed(2)),
    }));

    const resultsRow: number[] = await knex<CommandesRows[]>("commandesRows")
      .insert(dataRows)
      .returning("id");

    const articleStockResults = await articleStockSubquery;

    const dataForStock: Partial<ArticlesUpd>[] = data.map((item) => ({
      id: item.id_article,
      stock:
        articleStockResults.filter((el) => el.id === item.id_article)[0].stock -
        item.quantite,
    }));

    if (resultsRow && resultsRow.length > 0) {
      const resultsPutArticle = await Promise.all(
        dataForStock.map((item) => putArticleById(item))
      );

      const allSuccess = resultsPutArticle.every((result) => result);
      if (allSuccess) {
        return results;
      } else {
        return [-3];
      }
    } else {
      return [-4];
    }
  }

  return null;
};

export const putCommandeById = async (data: Partial<CommandesUpd>) => {
  const id = Number(data.id);
  const existingCommandes = await knex<Commandes>(table)
    .select("*")
    .where({ id })
    .first();

  if (!existingCommandes) {
    return null;
  }
  const updatedFields: Partial<CommandesUpd> = {};

  if (data.date && data.date !== existingCommandes.date) {
    const newDate = new Date(data.date);
    if (!isNaN(newDate.getTime())) {
      // Vérifiez si la date est valide
      updatedFields.date = data.date;
    }
  }

  if (data.date_visite && data.date_visite !== existingCommandes.date_visite) {
    const newDate = new Date(data.date_visite);
    if (!isNaN(newDate.getTime())) {
      // Vérifiez si la date est valide
      updatedFields.date_visite = data.date_visite;
    }
  }

  if (data.numero && data.numero !== existingCommandes.numero) {
    updatedFields.numero = data.numero;
  }

  if (
    Number(data.id_article) !== 0 &&
    data.id_article !== undefined &&
    Number(data.id_article) !== existingCommandes.id_article
  ) {
    updatedFields.id_article = data.id_article;
  } else if (data.article && data.article !== "") {
    const article = await getarticles();

    if (article) {
      const articleIndex = article.find(
        (articleObj) => articleObj.article === data.article
      );
      if (articleIndex && articleIndex?.id !== existingCommandes.id_article)
        updatedFields.id_article = articleIndex?.id;
      else return -3;
    }
  }

  if (
    Number(data.id_ticket) !== 0 &&
    data.id_ticket !== undefined &&
    Number(data.id_ticket) !== existingCommandes.id_ticket
  ) {
    updatedFields.id_ticket = data.id_ticket;
  } else if (data.ticket && data.ticket !== "") {
    const ticket = await getTickets();

    if (ticket) {
      const ticketIndex = ticket.find(
        (ticketObj) => ticketObj.tickets === data.ticket
      );
      if (ticketIndex && ticketIndex?.id !== existingCommandes.id_ticket)
        updatedFields.id_ticket = ticketIndex?.id;
      else return -3;
    }
  }

  if (data.prix && data.prix !== existingCommandes.prix) {
    updatedFields.prix = data.prix;
  }

  if (data.quantite && data.quantite !== existingCommandes.quantite) {
    updatedFields.quantite = data.quantite;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<Commandes>(table)
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};
