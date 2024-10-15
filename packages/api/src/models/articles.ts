import { knex } from "../../db";
import { getAnimaux } from "./races";
import { Articles, ArticlesUpd, GroupeTickets } from "./types/articles";

export const table = "articles";

export const getArticles = async (categorieVentes?: string) => {
  const query = knex<Articles>(table)
    .select(
      "articles.id",
      "articles.id_animaux",
      "articles.article",
      "articles.prix",
      "articles.disponible",
      "articles.stock",
      "articles.id_categorie_vente",
      "a.animal",
      "a.background",
      "c.categorie_vente",
      "groupe_tickets"
    )
    .leftJoin("animaux as a", "a.id", "articles.id_animaux")
    .innerJoin("categorie_ventes as c", "c.id", "articles.id_categorie_vente")
    .leftJoin("groupe_tickets as g", "g.id", "articles.id_groupe_tickets")
    .orderBy("articles.id", "asc");

  // Si `categorieVentes` est défini, on ajoute la clause `where`
  if (categorieVentes) {
    query.where({ "c.categorie_vente": categorieVentes });
  }

  const results = await query;

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

const getGroupeTickets = async () => {
  const results = await knex<GroupeTickets>("groupe_tickets").select("*");

  if (results && results.length) {
    return results;
  }
  return null;
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
      else return -1;
    }
  }

  if (
    Number(data.id_groupe_tickets) !== 0 &&
    data.id_groupe_tickets !== undefined &&
    Number(data.id_groupe_tickets) !== existingarticle.id_groupe_tickets
  ) {
    updatedFields.id_groupe_tickets = data.id_groupe_tickets;
  } else if (data.groupe_tickets && data.groupe_tickets !== "") {
    const groupe_tickets = await getGroupeTickets();

    if (groupe_tickets) {
      const groupeTicketsIndex = groupe_tickets.find(
        (groupeTicketsObj) =>
          groupeTicketsObj.groupe_tickets === data.groupe_tickets
      );
      if (
        groupeTicketsIndex &&
        groupeTicketsIndex?.id !== existingarticle.id_animaux
      )
        updatedFields.id_animaux = groupeTicketsIndex?.id;
      else return -2;
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
