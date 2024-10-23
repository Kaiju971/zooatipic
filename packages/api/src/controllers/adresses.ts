import { Request, Response } from "express";
import * as AdressesModel from "../models/adresses";
import { AdresseType } from "../models/types/adresses";

type Adresse = typeof AdressesModel;

export const getAllAdresses =
  (model: Adresse) =>
  async (req: Request, res: Response): Promise<any> => {
    const adresses = await model.getAdresses;
    if (!adresses) {
      return res.status(404).send({ message: "Aucun adresse" });
    }
    res.send({ results: [adresses] });
  };

export const deleteAdresse =
  (model: Adresse) =>
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    const adressetId = await model.deleteAdresseById(id as string);

    if (!adressetId) {
      return res
        .status(400)
        .send({ message: "L'adresse n'a pas été supprimé" });
    }

    res.send({ results: [adressetId] });
  };

export const createNewAdresse =
  (model: Adresse) =>
  async (req: Request, res: Response): Promise<any> => {
    const data = req.body;

    const dataAdresse: Partial<AdresseType> = {
      numero: data.numero,
      adresse: data.adresse,
      code_postal: Number(data.codePostal),
      ville: data.ville,
      id_adresse_type: Number(data.id_adresse_type),
    };

    const adresseId = await model.createAdresse(dataAdresse as AdresseType);

    if (adresseId === -1) {
      return res.status(404).send({ message: "L'adresse n'a pas été créé" });
    }

    res.send({ results: [adresseId] });
  };

export const updateAdressetById =
  (model: Adresse) =>
  async (req: Request, res: Response): Promise<any> => {
    const data = req.body;

    const adressetId = await model.putAdresseById(data as any);

    if (!adressetId) {
      return res.status(400).send({ message: "L'adresse n'a pas été modifié" });
    }

    res.send({ results: [adressetId] });
  };
