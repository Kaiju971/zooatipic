import { knex } from "../../db";
import { Tickets } from "./types/tickets";

export const table = "tickets";

export const getTickets = async () => {
  const results = await knex<Tickets>(table).select("*");

  if (results && results.length) {
    return results;
  }
  return null;
};

export const getTicketPrixbyId = async (id: number) => {
  const results = await knex<Tickets>(table).select("prix").where({ id });

  if (results) {
    return results[0].prix;
  }
  return null;
};

export const deleteTicketById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createTicket = async (data: any) => {
  const results: number[] = await knex<Tickets>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const putTicketById = async (data: Tickets) => {
  const id = Number(data.id);
  const existingTicket = await knex<Tickets>("tickets")
    .select("*")
    .where({ id })
    .first();

  if (!existingTicket) {
    return null;
  }
  const updatedFields: Partial<Tickets> = {};

  if (data.tickets !== existingTicket.tickets && data.tickets !== "") {
    updatedFields.tickets = data.tickets;
  }

  if (data.prix !== existingTicket.prix && data.prix !== 0) {
    updatedFields.prix = data.prix;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<Tickets>("tickets")
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};
