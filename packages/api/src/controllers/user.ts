import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MIN_SIZE_IMAGE, MAX_SIZE_IMAGE } from "../constants";
import * as userModel from "../models/user";

type User = typeof userModel;

const { ENCRYPTION_KEY, AUTH_TOKEN_KEY } = process.env;

export const login = (model: User) => async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user exist AND password supplied is correct

    const id = "";
    const user = await model.getUserBy(id as string, email as string);

    if (!user) {
      return res.status(404).send({ message: "L'utilisateur n'existe pas" });
    }

    const userExists = !!user;
    const passwordCorrect =
      userExists && (await bcrypt.compare(password as string, user.password));

    if (passwordCorrect) {
      const jwtOptions = {
        expiresIn: "24h", // Expire token in 24 hours
      };

      const userDataWithoutImage = {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        password: user.password,
        id_role: user.id_role,
        role: user.role,
      };

      const authToken = jwt.sign(
        userDataWithoutImage,
        AUTH_TOKEN_KEY!,
        jwtOptions
      );

      return res.status(200).json({
        success: true,
        user: {
          user_id: user.id,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          auth_token: authToken,
          id_role: user.id_role,
          role: user.role,
        },
      });
    }

    return res.status(400).json({ error: "Mot de passe invalide" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Erreur serveur` });
  }
};

export const getAllUsers =
  (model: User) => async (req: Request, res: Response) => {
    const user = await model.getUsers();
    if (!user) {
      return res.status(404).send({ message: "Aucun utilisateur" });
    }
    res.send({ results: [user] });
  };

export const deleteRole =
  (model: User) => async (req: Request, res: Response) => {
    const id = req.params.id;

    const roleId = await model.deleteRoleById(id as string);

    if (!roleId) {
      return res
        .status(400)
        .send({ message: "Utilisateur n'a pas été supprimé" });
    }

    res.send({ results: [roleId] });
  };

export const getAllRoles =
  (model: User) => async (req: Request, res: Response) => {
    const role = await model.getRoles();
    if (!role) {
      return res.status(404).send({ message: "Aucun role" });
    }
    res.send({ results: [role] });
  };

export const createNewRole =
  (model: User) => async (req: Request, res: Response) => {
    const data = req.query;

    const roleId = await model.createRole(data as any);

    if (!roleId) {
      return res.status(404).send({ message: "Le role n'a pas été créé" });
    }

    res.send({ results: [roleId] });
  };

export const deleteUser =
  (model: User) => async (req: Request, res: Response) => {
    const id = req.params.id;

    const userId = await model.deleteUserById(id as string);

    if (!userId) {
      return res
        .status(400)
        .send({ message: "Utilisateur n'a pas été supprimé" });
    }

    res.send({ results: [userId] });
  };

export const createNewUser =
  (model: User) => async (req: Request, res: Response) => {
    const avatar = req.file;
    const data = req.body;

    let file;
    if (avatar) {
      file = avatar?.buffer;
      const array_of_allowed_file_types = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];

      if (avatar?.size > MAX_SIZE_IMAGE) {
        return res
          .status(400)
          .send({ message: "Le fichier est trop volumineux" });
      }

      if (avatar.size < MIN_SIZE_IMAGE) {
        return res.status(400).send({ message: "Le fichier est trop petit" });
      }

      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res
          .status(400)
          .send({ message: "Le type de fichier n'est pas valide" });
      }
    }

    try {
      const userExist = await model.getUserBy("", data.email as string, "");

      if (userExist) {
        return res.status(409).json({ error: "email existant" });
      }

      // Encrypt user password
      const passwordHash = await bcrypt.hash(
        data.password,
        parseInt(ENCRYPTION_KEY!)
      );

      // Create auth token with user info and expiry date
      const userData = {
        id: data.id,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        id_role: data.id_role,
        password: passwordHash,
        image: file,
      };

      // Persist user data
      const id = await model.createUser(userData);

      const userDataWithoutImage = {
        id: data.id,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        id_role: data.id_role,
        password: passwordHash,
      };

      const jwtOptions = {
        expiresIn: "24h", // Expire token in 24 hours
      };

      const authToken = jwt.sign(
        userDataWithoutImage,
        AUTH_TOKEN_KEY!,
        jwtOptions
      );

      return res.status(200).send({
        success: true,
        user: {
          user_id: userData.id,
          email: userData.email,
          name: userData.nom,
          auth_token: authToken,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `Erreur interne` });
    }
  };
