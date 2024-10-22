import { knex } from "../../db";
import { AdresseType } from "./types/adresses";

export const table = "adresses";

export const getAdresses = async () => {
  const results = await knex<AdresseType>(table).select("*");

  if (results && results.length) {
    return results;
  }
  return null;
};

export const findAdresse = async (
  data: AdresseType,
  idUserAdresse: number
): Promise<number> => {
  //verifier si c'est l'adresse de user - id_adresse c'esr id_adresse de user type permanent
  if (idUserAdresse && idUserAdresse > 0) {
    const existingAdresseUser = await knex<AdresseType>(table)
      .select("*")
      .where({ id: idUserAdresse })
      .andWhere({ id_adresse_type: 1 })
      .first();

    if (existingAdresseUser) {
      if (
        existingAdresseUser.numero === data.numero &&
        existingAdresseUser.adresse === data.adresse &&
        existingAdresseUser.code_postal === data.code_postal &&
        existingAdresseUser.ville === data.ville
      )
        return idUserAdresse;
    }
  }

  //verifier si c'est l'adresse déjà existe type temporaire
  if (
    data.numero != null &&
    data.adresse !== null &&
    data.code_postal !== null &&
    data.ville !== null
  ) {
    const existingAdresseRandomId = await knex<AdresseType>(table)
      .select("id")
      .where({ numero: data.numero })
      .andWhere({ adresse: data.adresse })
      .andWhere({ code_postal: Number(data.code_postal) })
      .andWhere({ ville: data.ville })
      .andWhere({ id_adresse_type: 2 })
      .first();

    if (existingAdresseRandomId) {
      return existingAdresseRandomId?.id;
    }
  }

  return -1;
};

export const createAdresse = async (data: any) => {
  const results: number[] = await knex<AdresseType>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const deleteAdresseById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const putAdresseById = async (data: AdresseType) => {
  const id = Number(data.id);
  const existingAdresse = await knex<AdresseType>(table)
    .select("*")
    .where({ id })
    .first();

  if (!existingAdresse) {
    return null;
  }
  const updatedFields: Partial<AdresseType> = {};

  if (data.adresse !== existingAdresse.adresse && data.adresse !== "") {
    updatedFields.adresse = data.adresse;
  }

  if (
    data.code_postal !== existingAdresse.code_postal &&
    data.code_postal !== 0
  ) {
    updatedFields.code_postal = data.code_postal;
  }

  if (data.numero !== existingAdresse.numero && data.numero !== 0) {
    updatedFields.numero = data.numero;
  }

  if (data.ville !== existingAdresse.ville && data.ville !== "") {
    updatedFields.ville = data.ville;
  }

  if (
    data.id_adresse_type !== existingAdresse.id_adresse_type &&
    data.id_adresse_type !== null
  ) {
    updatedFields.id_adresse_type = data.id_adresse_type;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<AdresseType>(table)
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};
