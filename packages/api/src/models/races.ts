import { knex } from "../../db";
import { Animaux, Races } from "./types/races";

export const table = "races";

export const getAllRaces = async () => {
  const results = await knex<Races>(table)
    .select("*")
    .innerJoin("animaux", "animaux.id", "races.id_animaux");
  if (results && results.length) {
    return results;
  }
  return null;
};

export const deleteRaceById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createRace = async (data: any) => {
  const results: number[] = await knex<Races>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const getAnimaux = async () => {
  const results = await knex<Animaux>("animaux").select("*");

  if (results && results.length) {
    return results;
  }
  return null;
};

export const deleteAnimalById = async (id: string) => {
  return knex<number>("animaux").where("id", id).del();
};

export const createAnimal = async (data: any) => {
  const results: number[] = await knex<Animaux>("animaux")
    .insert({ ...data })
    .returning("id");

  return results[0];
};