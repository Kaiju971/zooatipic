import { Request, Response } from "express";
import * as CommandesModel from "../models/commandes";
import { Commandes } from "../models/types/commandes";

type CommandesModel = typeof CommandesModel;

interface CommandeResult {
  commandeId?: number;
  error?: number;
  outOfStockItems?: { article: any; diff: any }[];
}

export const getAllCommandes =
  (model: CommandesModel) => async (req: Request, res: Response) => {
    const commandes = await model.getCommandes();
    if (!commandes) {
      return res.status(404).send({ message: "Aucune commande" });
    }
    res.send({ results: [commandes] });
  };

export const deleteCommande =
  (model: CommandesModel) => async (req: Request, res: Response) => {
    const id = req.params.id;

    const commandeId = await model.deleteCommandeById(id as string);

    if (!commandeId) {
      return res
        .status(400)
        .send({ message: "La commande n'a pas été supprimé" });
    }

    res.send({ results: [commandeId] });
  };

export const createNewCommande =
  (model: CommandesModel) => async (req: Request, res: Response) => {
    const { commande, commandeRows } = req.body;

    console.log("Request received"); // Лог получения запроса
    const result: CommandeResult = await model.createCommande(
      commande,
      commandeRows
    );
    console.log("Result from model:", result); // Лог результата из модели

    if (result?.error === -1) {
      return res.status(404).send({ message: "La commande n'a pas été créé" });
    }

    if (result?.error === -2) {
      const outOfStockItems = (
        result.outOfStockItems as { article: string; diff: number }[]
      )
        .map((item) => `article: ${item.article}, manque: ${-item.diff}`)
        .join("; ");

      return res.status(422).json({
        message: `Pas de stock pour les articles: ${outOfStockItems}`,
      });
    }

    if (result?.error === -3) {
      return res.status(422).json({
        message: `Impossible d'enregistrer la modification du stock`,
      });
    }

    res.send({ results: result?.commandeId });
  };

export const updateCommandeById =
  (model: CommandesModel) => async (req: Request, res: Response) => {
    const data = req.body;

    const commandeId = await model.putCommandeById(data as any);

    if (!commandeId) {
      return res
        .status(400)
        .send({ message: "La commande n'a pas été modifiée" });
    }

    res.send({ results: [commandeId] });
  };
