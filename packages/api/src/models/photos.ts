import { knex } from "../../db";
import { DataImages, DataImagesRaces, Images, ImagesUpd } from "./types/races";
import { v4 } from "uuid";
import storage from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAllRaces, getAnimaux } from "./races";
import { getArticles } from "./articles";

export const table = "photos";

export const getPhotos = async () => {
  const results = await knex<DataImages>(table).select("*");

  if (results && results.length) {
    return results;
  }

  return null;
};

export const getPhotosCategorie = async () => {
  const results = await knex<DataImages>(table)
    .select(
      `${table}.id`,
      `${table}.lien`,
      `${table}.id_animal`,
      `${table}.id_race`,
      `${table}.principale`,
      `a.animal`,
      `a.background`
    )
    .where({ principale: true })
    .leftJoin("animaux as a", "id_animal", "a.id")
    .whereNotNull("id_animal")
    .andWhere({ id_article: null });

  if (results && results.length) {
    return results;
  }

  return null;
};

export const getPhotosArticles = async (categorieVentes: string) => {
  const results = await knex<DataImages>(table)
    .select(
      `${table}.id`,
      `${table}.lien`,
      `a.id_animaux`,
      `${table}.id_article`,
      `a.article`,
      `a.prix`,
      `a.stock`
    )
    .leftJoin("articles as a", "id_article", "a.id")
    .leftJoin("categorie_ventes as c", "id_categorie_vente", "c.id")
    .whereNotNull("id_article")
    .andWhere({ categorie_vente: categorieVentes });

  if (results && results.length) {
    return results;
  }

  return null;
};

export const getPhotosProduitsByCategorie = async (id_animal: number) => {
  const results = await knex<DataImages>(table)
    .select(
      `${table}.id`,
      `${table}.lien`,
      `${table}.id_animal`,
      `${table}.id_race`,
      `${table}.principale`,
      `r.race`
    )

    .leftJoin("races as r", "id_race", "r.id")
    .where({ id_animal });

  if (results && results.length) {
    return results;
  }

  return null;
};

export const getPhotosByIdRace = async (id_race: number) => {
  const results = await knex<DataImagesRaces>(table)
    .select(
      `${table}.id`,
      `${table}.lien`,
      `${table}.id_animal`,
      `${table}.id_race`,
      `r.race`,
      `r.description`
    )

    .leftJoin("races as r", "id_race", "r.id")
    .where({ id_race });

  if (results && results.length) {
    return results;
  }

  return null;
};

export const deletePhotoById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createPhoto = async (
  data: Images,
  photoUrl: string
): Promise<number | undefined> => {
  const photo = { ...data, lien: photoUrl };
  const results = await knex<Images>(table)
    .insert({ ...photo })
    .returning("id");

  if (results && results.length) return results[0].id;
};

//Choisissons toutes les photos de cette catégorie, à l'exclusion de ce produit.
//Si elles sont et notre photo avec le signe "principal", nous devons apposer le signe" principal "
//dans false pour toutes les autres photos, sauf cela. Si notre photo n'est pas avec le signe "principal"
//et c'est la seule photo de la catégorie, nous devons apposer le signe "principal" dans la vérité.

export const setPhotoPrincipale = async (
  data: DataImages,
  photoId: number
): Promise<number> => {
  const photos = await knex<Images>(table)
    .select("*")
    .where({ id_animal: Number(data.id_animal) ?? null })
    .andWhereNot({ id: photoId });

  if (photos && photos.length) {
    if (data.principale) {
      photos.filter((el) => el.principale === true);

      if (photos && photos.length)
        photos.map((item) => updatePrincipale(item.id, false));

      return photos.length;
    }
  } else {
    if (!data.principale) {
      const results = await updatePrincipale(photoId, true);

      if (results) return 1;
    }
  }
  return -1;
};

const updatePrincipale = async (id: number, principale: boolean) => {
  const results = await knex<Images>(table)
    .update({ principale: principale })
    .where({ id: id as number });

  if (results) return results;

  return null;
};

export const uploadProduitImage = async (file: Buffer) => {
  const fileName = v4();
  const storageRef = ref(storage, `images/${fileName}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (err) {
    throw new Error(`Upload file error. File: ${file}. ${JSON.stringify(err)}`);
  }
};

export const getIdPhotoById = async (id: number) => {
  const results = await knex<Images>(table).select("*").where({ id });

  if (results && results.length) return results[0];

  return null;
};

export const putPhoto = async (
  id: number,
  data: Partial<ImagesUpd>
): Promise<number> => {
  const existingPhoto = await getIdPhotoById(id);

  if (!existingPhoto) {
    return -2;
  }
  const updatedFields: Partial<ImagesUpd> = {};

  if (
    data.principale !== existingPhoto.principale &&
    data.principale !== undefined
  ) {
    updatedFields.principale = data.principale;
  }

  if (
    Number(data.id_animal) !== 0 &&
    data.id_animal !== undefined &&
    Number(data.id_animal) !== existingPhoto.id_animal
  ) {
    updatedFields.id_animal = data.id_animal;
  } else if (data.animal && data.animal !== "") {
    const animaux = await getAnimaux();

    if (animaux) {
      const animalIndex = animaux.find(
        (animalObj) => animalObj.animal === data.animal
      );
      if (animalIndex && animalIndex?.id !== existingPhoto.id_race)
        updatedFields.id_animal = animalIndex?.id;
      else return -3;
    }
  }

  if (
    Number(data.id_race) !== 0 &&
    data.id_race !== undefined &&
    Number(data.id_race) !== existingPhoto.id_race
  ) {
    updatedFields.id_race = data.id_race;
  } else if (data.race && data.race !== "") {
    const races = await getAllRaces();

    if (races) {
      const raceIndex = races.find((raceObj) => raceObj.race === data.race);
      if (raceIndex && raceIndex?.id !== existingPhoto.id_race)
        updatedFields.id_race = raceIndex?.id;
      else return -4;
    }
  }

  if (
    Number(data.id_article) !== 0 &&
    data.id_article !== undefined &&
    Number(data.id_article) !== existingPhoto.id_article
  ) {
    updatedFields.id_article = data.id_article;
  } else if (data.article && data.article !== "") {
    const article = await getArticles();

    if (article) {
      const articleIndex = article.find(
        (articleObj) => articleObj.article === data.article
      );
      if (articleIndex && articleIndex?.id !== existingPhoto.id_article)
        updatedFields.id_article = articleIndex?.id;
      else return -4;
    }
  }

  if (data.lien !== existingPhoto.lien && data.lien !== "") {
    updatedFields.lien = data.lien;
  }

  if (Object.keys(updatedFields).length === 0) return -10;

  const results = await knex<ImagesUpd>(table)
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results && results.length && typeof results[0].id === "number")
    return Number(results[0].id);

  return -1;
};
