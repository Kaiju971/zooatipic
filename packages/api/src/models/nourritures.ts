import { knex } from "../../db";
import { Nourritures } from "./types/nourritures";

export const table = "nourritures";

export const getNourritures = async () => {
  const results = await knex<Nourritures>(table).select("*");
  if (results && results.length) {
    return results;
  }
  return null;
};

export const deleteNourritureById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createNourriture = async (data: any) => {
  const results: number[] = await knex<Nourritures>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};