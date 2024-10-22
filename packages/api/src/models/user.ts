import { knex } from "../../db";
import { Role, User } from "./types/user";

export const table = "users";

export const getUsers = async () => {
  const results = await knex<User>(table)
    .select(
      "users.nom",
      "users.prenom",
      "users.email",
      "users.password",
      "users.image",
      "roles.role"
    )
    .innerJoin("roles", "roles.id", "users.id_role");
  if (results && results.length) {
    return results;
  }
  return;
};

export const getUserBy = async (
  id: string = "",
  email: string = "",
  password: string = ""
) => {
  const query = knex<User>(table)
    .select(
      `${table}.id`,
      `${table}.nom`,
      `${table}.prenom`,
      `${table}.email`,
      `${table}.id_role`,
      `${table}.password`,
      `${table}.image`,
      `${table}.id_adresse`,
      "roles.role",
      "a.numero",
      "a.adresse",
      "a.code_postal",
      "a.ville"
    )
    .innerJoin("roles", "roles.id", "users.id_role")
    .leftJoin("adresses as a", "a.id", "users.id_adresse");

  if (id && !email && !password) {
    query.where("users.id", id);
  } else if (!id && email && password) {
    query.where({ email, password });
  } else if (!id && email && !password) {
    query.where({ email });
  }

  const results = await query;

  if (results && results.length) {
    return results[0];
  }

  return null;
};

export const getRoles = async () => {
  const results = await knex<Role>("roles").select("*");

  if (results && results.length) {
    return results;
  }
  return null;
};

export const deleteRoleById = async (id: string) => {
  return knex<number>("roles").where("id", id).del();
};

export const createRole = async (data: any) => {
  const results: number[] = await knex<Role>("roles")
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const deleteUserById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createUser = async (data: any) => {
  const results: number[] = await knex<User>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};
