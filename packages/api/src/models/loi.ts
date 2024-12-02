import { knex } from "../../db";
import { Loi } from "./types/loi";

export const table = "loi";

export const getLoi = async (titre: string) => {
  const results = await knex<Loi>(table).select("*").where("titre_loi", titre);
  if (results && results.length) {
    return results;
  }
  return null;
};

export const putLoiById = async (data: Loi) => {
  const id = Number(data.id);
  const existingLoi = await knex<Loi>(table).select("*").where({ id }).first();

  if (!existingLoi) {
    return null;
  }
  const updatedFields: Partial<Loi> = {};

  if (data.texte_loi !== existingLoi.texte_loi && data.texte_loi !== "") {
    updatedFields.texte_loi = data.texte_loi;
  }

  if (data.titre_loi !== existingLoi.titre_loi && data.titre_loi !== "") {
    updatedFields.titre_loi = data.titre_loi;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<Loi>(table)
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};
