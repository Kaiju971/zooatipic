import { Request, Response } from "express";
import * as articlesModel from "../models/articles";

type article = typeof articlesModel;

export const getAllarticles =
  (model: article) =>
  async (req: Request, res: Response): Promise<any> => {
    const { params } = req;
    const categorieVentes = params.categorieVentes;

    const articles = await model.getArticles(categorieVentes);
    if (!articles) {
      return res.status(404).send({ message: "Aucun article" });
    }

    res.send({ results: articles });
  };

export const deletearticle =
  (model: article) =>
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    const articleId = await model.deletearticleById(id as string);

    if (!articleId) {
      return res
        .status(400)
        .send({ message: "L'article n'a pas été supprimé" });
    }

    res.send({ results: [articleId] });
  };

export const createNewarticle =
  (model: article) =>
  async (req: Request, res: Response): Promise<any> => {
    const data = req.body;

    const articleId = await model.createarticle(data as any);

    if (!articleId) {
      return res.status(404).send({ message: "L'article n'a pas été créé" });
    }

    res.send({ results: [articleId] });
  };

export const updatearticleById =
  (model: article) =>
  async (req: Request, res: Response): Promise<any> => {
    const data = req.body;

    const nourritrureId = await model.putArticleById(data as any);

    if (!nourritrureId) {
      return res.status(400).send({ message: "L'article n'a pas été modifié" });
    }

    res.send({ results: [nourritrureId] });
  };
