import { Request, Response } from "express";
import { MIN_SIZE_IMAGE, MAX_SIZE_IMAGE } from "../constants";
import * as imagesModel from "../models/photos";
import { DataImages } from "../models/types/races";
type Photos = typeof imagesModel;

export const getPhotosCategorie =
  (model: Photos) => async (req: Request, res: Response) => {
    const photos = await model.getPhotosCategorie();

    if (!photos) {
      return res.status(404).send({ message: "Pas de photo" });
    }

    res.send({ results: [photos] });
  };

export const uploadImage =
  (model: Photos) => async (req: Request, res: Response) => {
    const filePicture = req.file;

    const photo = req.body;

    const data: DataImages = {
      id_animal:
        photo.id_animal !== undefined && photo.id_animal !== null
          ? Number(photo.id_animal)
          : null, 
      id_race:
        photo.id_race !== undefined && photo.id_race !== null
          ? Number(photo.id_race)
          : null, 
      principale:
        photo.principale === "false" || photo.principale === false
          ? false
          : true, 
      id_nourriture:
        photo.id_nourriture !== undefined && photo.id_nourriture !== null
          ? Number(photo.id_nourriture)
          : null, 
    };


    let photoUrl = "";
    if (filePicture) {
      const file = filePicture?.buffer;
      const array_of_allowed_file_types = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];

      if (filePicture?.size > MAX_SIZE_IMAGE) {
        return res
          .status(400)
          .send({ message: "Le fichier est trop volumineux" });
      }

      if (filePicture.size < MIN_SIZE_IMAGE) {
        return res.status(400).send({ message: "Le fichier est trop petit" });
      }

      if (!array_of_allowed_file_types.includes(filePicture.mimetype)) {
        return res
          .status(400)
          .send({ message: "Le type de fichier n'est pas valide" });
      }

      photoUrl = await model.uploadProduitImage(file);
      if (!photoUrl)
        return res
          .status(400)
          .send({ message: "Le fichier n'a pas pu se télécharger" });
    }

    let photoExist;
    if (photo.id) {
      photoExist = await model.getIdPhotoById(photo.id);
    }
    let result = 0;

    if (photoExist) {
      const dataUpd = {
        lien: photoUrl,
        principale: data.principale,
        id_animal: data.id_animal,
        id_race: data.id_race,
      };

      result = await model.putPhoto(photo.id, dataUpd);

      if (result === -10) {
        return res.status(400).send({ message: "Aucun changement effectué" });
      }
      if (result === -2) {
        return res.status(400).send({ message: "Le photo n'a pas été trouvé" });
      }
      if (result === -3) {
        return res
          .status(400)
          .send({ message: "La photo categorie n'a pas été trouvé" });
      }
      if (result === -4) {
        return res
          .status(400)
          .send({ message: "La photo produit n'a pas été trouvé" });
      }

      if (result === -1) {
        return res
          .status(400)
          .send({ message: "La photo n'a pas été modifié" });
      }
    } else {
      result = (await model.createPhoto(photo, photoUrl)) ?? 0;
    }

    const photoCount = model.setPhotoPrincipale(data, result);
    if (!photoCount) {
      return res.status(400).send({ message: "Pas de photo principale" });
    }

    return res.send({ results: [result] });
  };

export const getAllPhotos =
  (model: Photos) => async (req: Request, res: Response) => {
    const photos = await model.getPhotos();

    if (!photos) {
      return res.status(404).send({ message: "Pas de photo" });
    }

    res.send({ results: [photos] });
  };

export const deletePhoto =
  (model: Photos) => async (req: Request, res: Response) => {
    const { id } = req.params;

    const produitId = await model.deletePhotoById(id as string);

    if (!produitId) {
      return res.status(400).send({ message: "La photo n'a pas été supprimé" });
    }

    res.send({ results: [produitId] });
  };
