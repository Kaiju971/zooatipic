import { Request, Response } from "express";
import * as CommandesModel from "../models/commandes";
import { Commandes } from "../models/types/commandes";

type CommandesModel = typeof CommandesModel;

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
    const data = req.body as Commandes[];

    data.forEach((item: Partial<Commandes>) => {
      if (
        (item.id_ticket && !item.date_visite) ||
        (!item.id_ticket && item.date_visite)
      ) {
        return res.status(422).send({
          message: "La commande doit avoir un id_ticket et une date_visite",
        });
      }
    });

    const commandeId = await model.createCommande(data as Commandes[]);

    if (!commandeId) {
      return res.status(404).send({ message: "La commande n'a pas été créé" });
    }

    if (commandeId[0] === -2) {
      const outOfStockItems = (
        commandeId[1] as { article: string; diff: number }[]
      )
        .map((item) => `article: ${item.article}, manque: ${-item.diff}`)
        .join("; ");

      return res.status(422).json({
        message: `Pas de stock pour les articles: ${outOfStockItems}`,
      });
    }

    if (commandeId[0] === -3) {
      return res.status(422).json({
        message: `Impossible d'enregistrer la modification du stock`,
      });
    }

    if (commandeId[0] === -4) {
      return res.status(422).json({
        message: `Impossible  d'enregistrer les lignes de commande`,
      });
    }

    res.send({ results: [commandeId] });
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
