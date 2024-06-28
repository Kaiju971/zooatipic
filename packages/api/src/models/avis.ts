import { knex } from "../../db";
import { Avis, Sujets } from "./types/avis";

export const table = "avis";

export const getAvis = async () => {
  const results = await knex<Avis>(table)
    .select(
      "avis.message",
      "avis.note",
      "sujets.sujet",
      "users.nom",
      "users.prenom"
    )
    .innerJoin("sujets", "sujets.id", "avis.id_sujet")
    .innerJoin("users", "users.id", "avis.id_user");
  if (results && results.length) {
    return results;
  }
  return null;
};

export const deleteAvisById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const putAvisById = async (data: Avis) => {
  const id = Number(data.id);
  const existingAvis = await knex<Avis>("avis")
    .select("*")
    .where({ id })
    .first();

  if (!existingAvis) {
    return null;
  }
  const updatedFields: Partial<Avis> = {};

  if (data.message !== existingAvis.message && data.message !== "") {
    updatedFields.message = data.message;
  }

   if (data.note !== existingAvis.note && data.note !== 0) {
     updatedFields.note = data.note;
   }

    if (data.id_user !== existingAvis.id_user && data.id_user !== 0) {
      updatedFields.id_user = data.id_user;
    }

    if (data.id_sujet !== existingAvis.id_sujet && data.id_sujet !== 0) {
      updatedFields.id_sujet = data.id_sujet;
    }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<Avis>("avis")
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};

export const createAvis = async (data: any) => {
  const results: number[] = await knex<Avis>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const getSujets = async () => {
  const results = await knex<Sujets>("sujets").select("*");

  if (results && results.length) {
    return results;
  }
  return null;
};

export const deleteSujetsById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};



export const createSujet = async (data: any) => {
  const results: number[] = await knex<Sujets>("sujets")
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const putSujetById = async (data: Sujets) => {
  const id = Number(data.id);
  const existingSujet = await knex<Sujets>("sujets")
    .select("*")
    .where({ id })
    .first();

  if (!existingSujet) {
    return null;
  }
  const updatedFields: Partial<Sujets> = {};
 

  if (data.sujet !== existingSujet.sujet && data.sujet !== "") {
    updatedFields.sujet = data.sujet;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<Sujets>("sujets")
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};