import { Request, Response } from "express";
import * as StockModel from "../models/stock";

type Stock = typeof StockModel;

export const getAllStock =
  (model: Stock) =>
  async (req: Request, res: Response): Promise<any> => {
    const stock = await model.getStock();
    if (!stock) {
      return res.status(404).send({ message: "Aucun stock" });
    }
    res.send({ results: [stock] });
  };

export const deleteStock =
  (model: Stock) =>
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    const stockId = await model.deleteStockById(id as string);

    if (!stockId) {
      return res.status(400).send({ message: "Le stock n'a pas été supprimé" });
    }

    res.send({ results: [stockId] });
  };

export const createNewStock =
  (model: Stock) =>
  async (req: Request, res: Response): Promise<any> => {
    const data = req.body;

    const stockId = await model.createStock(data as any);

    if (!stockId) {
      return res.status(404).send({ message: "Le stock n'a pas été créé" });
    }

    res.send({ results: [stockId] });
  };

export const updateStockById =
  (model: Stock) =>
  async (req: Request, res: Response): Promise<any> => {
    const data = req.body;

    const stockId = await model.putStockById(data as any);

    if (!stockId) {
      return res.status(400).send({ message: "Le stock n'a pas été modifié" });
    }

    res.send({ results: [stockId] });
  };

export const getStockActuel =
  (model: Stock) =>
  async (req: Request, res: Response): Promise<any> => {
    const stock = await model.StockRestant();

    if (!stock) {
      return res.status(404).send({ message: "Pas de stock" });
    }

    res.send({ results: [stock] });
  };
