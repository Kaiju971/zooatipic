import { Request, Response } from "express";

import * as loiModel from "../models/loi";

type Loi = typeof loiModel;

export const getLoiByTitre =
  (model: Loi) =>
  async (req: Request, res: Response): Promise<any> => {
    const { params } = req;
    const titre = params.titre;
    
    const loi = await model.getLoi(titre);
    if (!loi) {
      return res.status(404).send({ message: "Aucune loi" });
    }
    res.send({results: loi });
  };

export const updateLoiById =
  (model: Loi) =>
  async (req: Request, res: Response): Promise<any> => {
    const data = req.body;

    const loiId = await model.putLoiById(data as any);

    if (!loiId) {
      return res.status(400).send({ message: "La loi n'a pas été modifié" });
    }

    res.send({ results: loiId });
  };
