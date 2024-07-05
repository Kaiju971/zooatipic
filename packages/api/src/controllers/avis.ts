import { Request, Response } from "express";
import * as avisModel from "../models/avis";
import { Sujets } from "../models/types/avis";

type Avis = typeof avisModel;

export const getAllAvis =
  (model: Avis) => async (req: Request, res: Response) => {
    const avis = await model.getAvis();
    if (!avis) {
      return res.status(404).send({ message: "Aucun avis" });
    }
    res.send({ results: [avis] });
  };

export const deleteAvis =
  (model: Avis) => async (req: Request, res: Response) => {
    const id = req.params.id;

    const avisId = await model.deleteAvisById(id as string);

    if (!avisId) {
      return res.status(400).send({ message: "L'avis n'a pas été supprimé" });
    }

    res.send({ results: [avisId] });
  };

export const createNewAvis =
  (model: Avis) => async (req: Request, res: Response) => {
    const data = req.body;

    const avisId = await model.createAvis(data as any);

    if (!avisId) {
      return res.status(404).send({ message: "L'avis n'a pas été créé" });
    }

    res.send({ results: [avisId] });
  };

  export const updateAvisById =
    (model: Avis) => async (req: Request, res: Response) => {
      const data = req.body;

      const avisId = await model.putAvisById(data as any);

      if (!avisId) {
        return res
          .status(400)
          .send({ message: "L'avis n'a pas été modifié" });
      }

      res.send({ results: [avisId] });
    };

export const getAllSujets =
  (model: Avis) => async (req: Request, res: Response) => {
    const sujet = await model.getSujets();
    if (!sujet) {
      return res.status(404).send({ message: "Aucun sujet" });
    }
    res.send({ results: [sujet] });
  };

export const deleteSujet =
  (model: Avis) => async (req: Request, res: Response) => {
    const id = req.params.id;

    const sujetId = await model.deleteAvisById(id as string);

    if (!sujetId) {
      return res.status(400).send({ message: "L'avis n'a pas été supprimé" });
    }

    res.send({ results: [sujetId] });
  };

export const createNewSujet =
  (model: Avis) => async (req: Request, res: Response) => {
    const data = req.body;

    const sujetId = await model.createSujet(data as any);

    if (!sujetId) {
      return res.status(404).send({ message: "Le sujet n'a pas été créé" });
    }

    res.send({ results: [sujetId] });
  };

  export const updateSujetById =
    (model: Avis) => async (req: Request, res: Response) => {
      const data = req.body;

      const sujetId = await model.putSujetById(data as any);

      if (!sujetId) {
        return res
          .status(400)
          .send({ message: "Le sujet n'a pas été modifié" });
      }

      res.send({ results: [sujetId] });
    };