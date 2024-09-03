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
      if (item.id_ticket && item.id_nourriture) {
        return res.status(422).send({
          message: "La commande ne peut contenir qu'un champ d'id_",
        });
      }
      if (
        (item.id_ticket && !item.date_visite) ||
        (!item.id_ticket && item.date_visite)
      ) {
        return res.status(422).send({
          message: "La commande doit avoir un id_ticket et une date_visite",
        });
      }
    });

    const commandeId = await model.createCommande(data as Partial<Commandes>[]);

    if (commandeId[0] === -1) {
      return res
        .status(422)
        .send({ message: "les champs id_tickets et id_nourriture sont vides" });
    }

    if (commandeId[0] === -2) {
      const outOfStockItems = (commandeId[1] as any[])
        .map(
          (item) => `id_nourriture: ${item.id_nourriture}, diff: ${item.diff}`
        )
        .join("; ");

      return res.status(422).send({
        message: `Pas de stock pour les articles: ${outOfStockItems}`,
      });
    }

    if (!commandeId) {
      return res.status(404).send({ message: "La commande n'a pas été créé" });
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
