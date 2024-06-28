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

export const putNourritureById = async (data: Nourritures) => {
  const id = Number(data.id);
  const existingNourriture = await knex<Nourritures>("nourritures")
    .select("*")
    .where({ id })
    .first();

  if (!existingNourriture) {
    return null;
  }
  const updatedFields: Partial<Nourritures> = {};

  if (data.nourriture !== existingNourriture.nourriture && data.nourriture !== "") {
    updatedFields.nourriture = data.nourriture;
  }

  if (data.id_animaux !== existingNourriture.id_animaux && data.id_animaux !== 0) {
    updatedFields.id_animaux = data.id_animaux;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<Nourritures>("nourritures")
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};


