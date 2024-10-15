import { knex } from "../../db";
import { getArticles } from "./articles";
import { Stock, StockUpd } from "./types/stock";

export const table = "stock";

export const getStock = async () => {
  const results = await knex<Stock>(table)
    .select("*")
    .innerJoin("articles", "articles.id", "stock.id_article");

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
    Number(data.id_article) !== 0 &&
    data.id_article !== undefined &&
    Number(data.id_article) !== existingStock.id_article
  ) {
    updatedFields.id_article = data.id_article;
  } else if (data.article && data.article !== "") {
    const article = await getArticles();

    if (article) {
      const articleIndex = article.find(
        (articleObj) => articleObj.article === data.article
      );
      if (articleIndex && articleIndex?.id !== existingStock.id_article)
        updatedFields.id_article = articleIndex?.id;
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
      this.on("commandes.id_article", "=", "stock.id_article").andOn(
        "commandes.date",
        ">=",
        knex.raw("?", [formattedMonday])
      );
    })
    .where("stock.date", ">=", formattedMonday)
    .groupBy("stock.id_article")
    .select(
      "stock.id_article",
      knex.raw("SUM(stock.quantite) as stock_quantite"),
      knex.raw("COALESCE(SUM(commandes.quantite), 0) as commande_quantite"),
      knex.raw(
        "SUM(stock.quantite) - COALESCE(SUM(commandes.quantite), 0) as quantite"
      )
    );

  if (results && results.length) {
    return results;
  }
  return null;
};
