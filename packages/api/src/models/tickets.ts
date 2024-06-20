import { knex } from "../../db";
import { Tickets } from "./types/tickets";

export const table = "tickets";

export const getTickets = async () => {
  const results = await knex<Tickets>(table)
    .select("*")
   
  if (results && results.length) {
    return results;
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

