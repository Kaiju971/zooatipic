import { knex } from "../../db";
import { getAnimaux } from "./races";
import { Articles, ArticlesUpd } from "./types/articles";

export const table = "articles";

export const getarticles = async () => {
  const results = await knex<Articles>(table)
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
  const results: number[] = await knex<Articles>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const putArticleById = async (data: Partial<ArticlesUpd>) => {
  const id = Number(data.id);
  const existingarticle = await knex<Articles>(table)
    .select("*")
    .where({ id })
    .first();

  if (!existingarticle) {
    return null;
  }
  const updatedFields: Partial<ArticlesUpd> = {};

  if (data.article !== existingarticle.article && data.article !== "") {
    updatedFields.article = data.article;
  }

  if (data.prix !== existingarticle.prix && data.prix !== 0) {
    updatedFields.prix = data.prix;
  }

  if (data.disponible !== existingarticle.disponible) {
    updatedFields.disponible = data.disponible;
  }

  if (data.stock !== existingarticle.stock && data.stock !== 0) {
    updatedFields.stock = data.stock;
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

  const results = await knex<Articles>(table)
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};
