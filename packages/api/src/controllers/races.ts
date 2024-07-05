import { Request, Response } from "express";

import * as raceModel from "../models/races";

type Race = typeof raceModel;

export const getAllRaces =
  (model: Race) => async (req: Request, res: Response) => {
    const race = await model.getAllRaces();
    if (!race) {
      return res.status(404).send({ message: "Aucune race" });
    }
    res.send({ results: [race] });
  };

export const updateRaceById =
  (model: Race) => async (req: Request, res: Response) => {
    const data = req.body;

    const raceId = await model.putRaceById(data as any);

    if (!raceId) {
      return res.status(400).send({ message: "La race n'a pas été modifié" });
    }

    res.send({ results: [raceId] });
  };

export const deleteRace =
  (model: Race) => async (req: Request, res: Response) => {
    const id = req.params.id;

    const raceId = await model.deleteRaceById(id as string);

    if (!raceId) {
      return res.status(400).send({ message: "La race n'a pas été supprimé" });
    }

    res.send({ results: [raceId] });
  };

export const createNewRace =
  (model: Race) => async (req: Request, res: Response) => {
    const data = req.body;

    const raceId = await model.createRace(data as any);

    if (!raceId) {
      return res.status(404).send({ message: "La race n'a pas été créé" });
    }

    res.send({ results: [raceId] });
  };

export const getAllAnimaux =
  (model: Race) => async (req: Request, res: Response) => {
    const animaux = await model.getAnimaux();
    if (!animaux) {
      return res.status(404).send({ message: "Aucun animal" });
    }
    res.send({ results: [animaux] });
  };

export const deleteAnimal =
  (model: Race) => async (req: Request, res: Response) => {
    const id = req.params.id;

    const animalId = await model.deleteAnimalById(id as string);

    if (!animalId) {
      return res.status(400).send({ message: "L'animal n'a pas été supprimé" });
    }

    res.send({ results: [animalId] });
  };

export const updateAnimalById =
  (model: Race) => async (req: Request, res: Response) => {
    const data = req.body;

    const animalId = await model.putAnimalById(data as any);

    if (!animalId) {
      return res.status(400).send({ message: "L'animal n'a pas été modifié" });
    }

    res.send({ results: [animalId] });
  };

export const createNewAnimal =
  (model: Race) => async (req: Request, res: Response) => {
    const data = req.body;

    const animalId = await model.createAnimal(data as any);

    if (!animalId) {
      return res.status(404).send({ message: "L'animal n'a pas été créé" });
    }

    res.send({ results: [animalId] });
  };
