import { knex } from "../../db";
import { getarticles } from "./articles";
import { getTickets } from "./tickets";
import { Commandes, CommandesUpd } from "./types/commandes";

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

export const deleteCommandeById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createCommande = async (data: Partial<Commandes>[]) => {
  const idarticleList: number[] = data
    .filter((item) => item.id_article !== undefined)
    .map((item) => item.id_article as number);

  const diff = await knex
    .with("commandes_temp", (qb) => {
      qb.select("*").from(
        knex.raw(
          `(
              VALUES ${data
                .filter((item) => item.id_article !== undefined)
                .map(
                  (item) => `( ${item.id_article}, ${Number(item.quantité)})`
                )
                .join(", ")}
            ) AS t(id_article, quantité)`
        )
      );
    })
    .select(
      "s.id_article",
      "s.total_quantité as stock_quantité",
      "c.quantité as commandes_quantité",
      knex.raw("CAST(s.total_quantité AS INTEGER) - c.quantité as difference")
    )
    .from(
      knex("stock")
        .select("id_article")
        .sum("quantité as total_quantité")
        .groupBy("id_article")
        .whereIn("id_article", idarticleList)
        .as("s")
    )
    .join("commandes_temp as c", "s.id_article", "c.id_article")
    .whereRaw("CAST(s.total_quantité AS INTEGER) < c.quantité");

  if (diff && diff.length) {
    const outOfStockItems = diff.map((item) => ({
      id_article: item.id_article,
      diff: item.difference,
    }));

    return [-2, outOfStockItems];
  }

  const results: number[] = await knex<Commandes>(table)
    .insert(data)
    .returning("id");

  return results;
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

  if (data.quantité && data.quantité !== existingCommandes.quantité) {
    updatedFields.quantité = data.quantité;
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
