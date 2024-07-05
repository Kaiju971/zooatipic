import { knex } from "../../db";
import { getAnimaux } from "./races";
import { Nourritures, NourrituresUpd } from "./types/nourritures";

export const table = "nourritures";

export const getNourritures = async () => {
  const results = await knex<Nourritures>(table)
    .select("*")
    .innerJoin("animaux", "animaux.id", "nourritures.id_animaux");

  if (results && results.length) {
    return results;
  }
  return null;
};

export const getNourriturePrixbyId = async (id: number) => {
  const results = await knex<number>(table).select("prix").where("id", id);

  if (results) {
    return results[0].prix;
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

export const putNourritureById = async (data: Partial<NourrituresUpd>) => {
  const id = Number(data.id);
  const existingNourriture = await knex<Nourritures>("nourritures")
    .select("*")
    .where({ id })
    .first();

  if (!existingNourriture) {
    return null;
  }
  const updatedFields: Partial<NourrituresUpd> = {};

  if (
    data.nourriture !== existingNourriture.nourriture &&
    data.nourriture !== ""
  ) {
    updatedFields.nourriture = data.nourriture;
  }

  if (data.prix !== existingNourriture.prix && data.prix !== 0) {
    updatedFields.prix = data.prix;
  }

  if (data.disponible !== existingNourriture.disponible) {
    updatedFields.disponible = data.disponible;
  }

  if (
    Number(data.id_animaux) !== 0 &&
    data.id_animaux !== undefined &&
    Number(data.id_animaux) !== existingNourriture.id_animaux
  ) {
    updatedFields.id_animaux = data.id_animaux;
  } else if (data.animal && data.animal !== "") {
    const animaux = await getAnimaux();

    if (animaux) {
      const animalIndex = animaux.find(
        (animalObj) => animalObj.animal === data.animal
      );
      if (animalIndex && animalIndex?.id !== existingNourriture.id_animaux)
        updatedFields.id_animaux = animalIndex?.id;
      else return -3;
    }
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
