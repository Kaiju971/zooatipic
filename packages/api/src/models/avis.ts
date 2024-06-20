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

export const createAvis = async (data: any) => {
  const results: number[] = await knex<Avis>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const createSujet = async (data: any) => {
  const results: number[] = await knex<Sujets>("sujets")
    .insert({ ...data })
    .returning("id");

  return results[0];
};