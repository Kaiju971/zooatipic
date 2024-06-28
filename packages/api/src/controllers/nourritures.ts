import { Request, Response } from "express";
import * as NourrituresModel from "../models/nourritures";

type Nourriture = typeof NourrituresModel;

export const getAllNourritures =
  (model: Nourriture) => async (req: Request, res: Response) => {
    const nourriture = await model.getNourritures();
    if (!nourriture) {
      return res.status(404).send({ message: "Aucune nourriture" });
    }
    res.send({ results: [nourriture] });
  };

export const deleteNourriture =
  (model: Nourriture) => async (req: Request, res: Response) => {
    const id = req.params.id;

    const nourritureId = await model.deleteNourritureById(id as string);

    if (!nourritureId) {
      return res.status(400).send({ message: "La nourriture n'a pas été supprimé" });
    }

    res.send({ results: [nourritureId] });
  };

export const createNewNourriture =
  (model: Nourriture) => async (req: Request, res: Response) => {
    const data = req.body;

    const nourritureId = await model.createNourriture(data as any);

    if (!nourritureId) {
      return res
        .status(404)
        .send({ message: "La nourritrure n'a pas été créé" });
    }

    res.send({ results: [nourritureId] });
  };

  export const updateNourritureById =
    (model: Nourriture) => async (req: Request, res: Response) => {
      const data = req.body;

      const nourritrureId = await model.putNourritureById(data as any);

      if (!nourritrureId) {
        return res
          .status(400)
          .send({ message: "La nourriture n'a pas été modifiée" });
      }

      res.send({ results: [nourritrureId] });
    };
