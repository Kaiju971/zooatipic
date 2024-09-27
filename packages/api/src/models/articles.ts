import { knex } from "../../db";
import { getAnimaux } from "./races";
import { articles, articlesUpd } from "./types/articles";

export const table = "article";

export const getarticles = async () => {
  const results = await knex<articles>(table)
    .select("*")
    .innerJoin("animaux", "animaux.id", "articles.id_animaux");

  if (results && results.length) {
    return results;
  }
  return null;
};

export const getarticlePrixbyId = async (id: number) => {
  const results = await knex<number>(table).select("prix").where("id", id);

  if (results) {
    return results[0].prix;
  }
  return null;
};

export const deletearticleById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createarticle = async (data: any) => {
  const results: number[] = await knex<articles>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const putarticleById = async (data: Partial<articlesUpd>) => {
  const id = Number(data.id);
  const existingarticle = await knex<articles>(table)
    .select("*")
    .where({ id })
    .first();

  if (!existingarticle) {
    return null;
  }
  const updatedFields: Partial<articlesUpd> = {};

  if (data.article !== existingarticle.article && data.article !== "") {
    updatedFields.article = data.article;
  }

  if (data.prix !== existingarticle.prix && data.prix !== 0) {
    updatedFields.prix = data.prix;
  }

  if (data.disponible !== existingarticle.disponible) {
    updatedFields.disponible = data.disponible;
  }

  if (
    Number(data.id_animaux) !== 0 &&
    data.id_animaux !== undefined &&
    Number(data.id_animaux) !== existingarticle.id_animaux
  ) {
    updatedFields.id_animaux = data.id_animaux;
  } else if (data.animal && data.animal !== "") {
    const animaux = await getAnimaux();

    if (animaux) {
      const animalIndex = animaux.find(
        (animalObj) => animalObj.animal === data.animal
      );
      if (animalIndex && animalIndex?.id !== existingarticle.id_animaux)
        updatedFields.id_animaux = animalIndex?.id;
      else return -3;
    }
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<articles>(table)
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};
