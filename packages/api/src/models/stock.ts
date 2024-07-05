import { knex } from "../../db";
import { getNourritures } from "./nourritures";
import { Stock, StockUpd } from "./types/stock";

export const table = "stock";

export const getStock = async () => {
  const results = await knex<Stock>(table)
    .select("*")
    .innerJoin("nourritures", "nourritures.id", "stock.id_nourriture");

  if (results && results.length) {
    return results;
  }
  return null;
};

export const deleteStockById = async (id: string) => {
  return knex<number>(table).where("id", id).del();
};

export const createStock = async (data: Stock) => {
  const results: number[] = await knex<Stock>(table)
    .insert({ ...data })
    .returning("id");

  return results[0];
};

export const putStockById = async (data: Partial<StockUpd>) => {
  const id = Number(data.id);
  const existingStock = await knex<StockUpd>("stock")
    .select("*")
    .where({ id })
    .first();

  if (!existingStock) {
    return null;
  }
  const updatedFields: Partial<StockUpd> = {};

  if (data.date && data.date !== existingStock.date) {
    const newDate = new Date(data.date);
    if (!isNaN(newDate.getTime())) {
      // Vérifiez si la date est valide
      updatedFields.date = data.date;
    }
  }

  if (data.disponible !== existingStock.disponible) {
    updatedFields.disponible = data.disponible;
  }

  if (
    Number(data.id_nourriture) !== 0 &&
    data.id_nourriture !== undefined &&
    Number(data.id_nourriture) !== existingStock.id_nourriture
  ) {
    updatedFields.id_nourriture = data.id_nourriture;
  } else if (data.nourriture && data.nourriture !== "") {
    const nourriture = await getNourritures();

    if (nourriture) {
      const nourritureIndex = nourriture.find(
        (nourritureObj) => nourritureObj.nourriture === data.nourriture
      );
      if (
        nourritureIndex &&
        nourritureIndex?.id !== existingStock.id_nourriture
      )
        updatedFields.id_nourriture = nourritureIndex?.id;
      else return -3;
    }
  }

  if (data.prix && data.prix !== existingStock.prix) {
    updatedFields.prix = data.prix;
  }

  if (Object.keys(updatedFields).length === 0) {
    return null;
  }

  const results = await knex<StockUpd>("stock")
    .update(updatedFields)
    .where({ id })
    .returning("id");

  if (results) return results[0];

  return null;
};

const getCurrentMonday = (): Date => {
  const today = new Date();
  const day = today.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const currentMonday = new Date(today.setDate(today.getDate() + diff));
  return currentMonday;
};

export const StockRestant = async () => {
  const monday = getCurrentMonday();
  const formattedMonday = monday.toISOString().split("T")[0];
  const results: number[] = await knex<Stock>(table)
    .leftJoin("commandes", function () {
      this.on("commandes.id_nourriture", "=", "stock.id_nourriture").andOn(
        "commandes.date",
        ">=",
        knex.raw("?", [formattedMonday])
      );
    })
    .where("stock.date", ">=", formattedMonday)
    .groupBy("stock.id_nourriture")
    .select(
      "stock.id_nourriture",
      knex.raw("SUM(stock.quantité) as stock_quantité"),
      knex.raw("COALESCE(SUM(commandes.quantité), 0) as commande_quantité"),
      knex.raw(
        "SUM(stock.quantité) - COALESCE(SUM(commandes.quantité), 0) as quantité"
      )
    );

  if (results && results.length) {
    return results;
  }
  return null;
};
