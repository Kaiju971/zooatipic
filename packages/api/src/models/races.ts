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

export const putRaceById = async (data: Races) => {
  const id = Number(data.id);
  const existingRace = await knex<Races>("races")
    .select("*")
    .where({ id })
    .first();

  if (!existingRace) {
    return null;
  }
  const updatedFields: Partial<Races> = {};

  if (data.race !== existingRace.race && data.race !== "") {
    updatedFields.race = data.race;
  }

  if (data.id_animaux !== existingRace.id_animaux && data.id_animaux !== 0) {
    updatedFields.id_animaux = data.id_animaux;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<Races>("races")
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

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

export const putAnimalById = async (data: Animaux) => {
  const id = Number(data.id);
  const existingAnimal = await knex<Animaux>("animaux")
    .select("*")
    .where({ id })
    .first();

  if (!existingAnimal) {
    return null;
  }
  const updatedFields: Partial<Animaux> = {};

  if (data.animal !== existingAnimal.animal && data.animal !== "") {
    updatedFields.animal = data.animal;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<Animaux>("animaux")
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

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
