import { knex } from "../../db";
import { getNourritures } from "./nourritures";
import { getTickets } from "./tickets";
import { Commandes, CommandesUpd } from "./types/commandes";

export const table = "commandes";

export const getCommandes = async () => {
  const results = await knex<Commandes>(table)
    .select("*")
    .leftJoin("nourritures", "nourritures.id", "commandes.id_nourriture")
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
  const idNourritureList: number[] = data
    .filter((item) => item.id_nourriture !== undefined)
    .map((item) => item.id_nourriture as number);

  const diff = await knex
    .with("commandes_temp", (qb) => {
      qb.select("*").from(
        knex.raw(
          `(
              VALUES ${data
                .filter((item) => item.id_nourriture !== undefined)
                .map(
                  (item) => `( ${item.id_nourriture}, ${Number(item.quantité)})`
                )
                .join(", ")}
            ) AS t(id_nourriture, quantité)`
        )
      );
    })
    .select(
      "s.id_nourriture",
      "s.total_quantité as stock_quantité",
      "c.quantité as commandes_quantité",
      knex.raw("CAST(s.total_quantité AS INTEGER) - c.quantité as difference")
    )
    .from(
      knex("stock")
        .select("id_nourriture")
        .sum("quantité as total_quantité")
        .groupBy("id_nourriture")
        .whereIn("id_nourriture", idNourritureList)
        .as("s")
    )
    .join("commandes_temp as c", "s.id_nourriture", "c.id_nourriture")
    .whereRaw("CAST(s.total_quantité AS INTEGER) < c.quantité");

  if (diff && diff.length) {
    const outOfStockItems = diff.map((item) => ({
      id_nourriture: item.id_nourriture,
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
    Number(data.id_nourriture) !== 0 &&
    data.id_nourriture !== undefined &&
    Number(data.id_nourriture) !== existingCommandes.id_nourriture
  ) {
    updatedFields.id_nourriture = data.id_nourriture;
  } else if (data.nourriture && data.nourriture !== "") {
    const nourriture = await getNourritures();

    if (nourriture) {
      const nourritureIndex = nourriture.find(
        (nourritureObj) => nourritureObj.nourriture === data.nourriture
      );
      if (
        nourritureIndex &&
        nourritureIndex?.id !== existingCommandes.id_nourriture
      )
        updatedFields.id_nourriture = nourritureIndex?.id;
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
