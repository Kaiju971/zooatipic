import { knex } from "../../db";
import { getArticles, putArticleById } from "./articles";
import { Articles, ArticlesUpd } from "./types/articles";
import {
  Commandes,
  CommandesHead,
  CommandesRows,
  CommandesUpd,
  DataRows,
} from "./types/commandes";
import { TVA } from "../constants";

export const table = "commandes";

interface Article {
  id: number;
  article: string;
  stock: number;
}

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

export const createCommande = async (
  dataCommande: CommandesHead,
  commandeRows: CommandesRows[]
) => {
  try {
    const result = await knex.transaction(async (trx) => {
      const idArticleList: number[] = commandeRows
        .filter((item) => item.categorie_ventes === "nourriture")
        .map((item) => item.id_article as number);

      const articleStockSubquery = await trx("articles")
        .select("id", "article", "stock")
        .whereIn("id", idArticleList)
        .as("a");

      const subquerySQL = articleStockSubquery
        .map((item) => `(${item.id}, '${item.article}', ${item.stock})`)
        .join(", ");

      const diff = await trx
        .with("commandes_temp", (qb) => {
          qb.select("*").from(
            trx.raw(
              `(
              VALUES ${commandeRows
                .filter((item) => item.categorie_ventes === "nourriture")
                .map((item) => `(${item.id_article}, ${Number(item.quantite)})`)
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
          trx.raw("CAST(a.stock AS INTEGER) - c.quantite as difference")
        )
        .from(trx.raw(`(VALUES ${subquerySQL}) AS a(id, article, stock)`))
        .join("commandes_temp as c", "a.id", "c.id_article")
        .whereRaw("CAST(a.stock AS INTEGER) < c.quantite");

      if (diff && diff.length) {
        const outOfStockItems = diff.map((item) => ({
          article: item.article,
          diff: item.difference,
        }));

        trx.rollback();
        return { error: -2, outOfStockItems };
      }

      //const lastNumber = await getLastNumber();

      dataCommande.somme = Number(dataCommande.somme.toFixed(2));
      dataCommande.tva = Number(dataCommande.tva.toFixed(2));

      const results: { id: number }[] = await trx<CommandesHead>(table)
        .insert(dataCommande)
        .returning("id");

      if (results) {
        const commandId = Number(results[0].id);
        const dataRows: DataRows[] = commandeRows.map((item) => ({
          id_commande: commandId,
          id_article: item.id_article,
          prix: item.prix,
          quantite: item.quantite,
          somme: Number((item.prix * item.quantite).toFixed(2)),
          tva: Number((item.prix * item.quantite * TVA).toFixed(2)),
        }));

        const resultsRow: number[] = await trx<DataRows[]>("commandesRows")
          .insert(dataRows)
          .returning("id");

        const articleStockResults = await articleStockSubquery;

        const dataForStock: Partial<Articles>[] = commandeRows.map((item) => ({
          id: item.id_article,
          stock:
            articleStockResults.filter(
              (el: Articles) => el.id === item.id_article
            )[0].stock - item.quantite,
        }));

        if (resultsRow && resultsRow.length > 0) {
          const resultsPutArticle = await Promise.all(
            dataForStock.map((item) => {
              return trx<Articles>("articles")
                .update("stock", item.stock ?? 0)
                .where("id", item.id);
            })
          );

          const allSuccess = resultsPutArticle.every((result) => result);

          if (allSuccess) {
            return { id: commandId, numero: commandId };
          } else {
            return { error: -3 };
          }
        } else {
          return { error: -4 };
        }
      }
    });
    return { result };
  } catch (error: unknown) {
    console.error("Transaction failed:", error);
    return { error: -1 };
  }
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
    const article = await getArticles();

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
    // const ticket = await getTickets();
    // if (ticket) {
    //   const ticketIndex = ticket.find(
    //     (ticketObj) => ticketObj.tickets === data.ticket
    //   );
    //   if (ticketIndex && ticketIndex?.id !== existingCommandes.id_ticket)
    //     updatedFields.id_ticket = ticketIndex?.id;
    //   else return -3;
    // }
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
