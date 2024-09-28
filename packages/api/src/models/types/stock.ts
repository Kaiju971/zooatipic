export type Stock = {
  id_article: number;
  quantite: number;
  prix: number;
  date: Date;
  disponible: boolean;
};

export type StockUpd = {
  id: number;
  id_article: number;
  article: string;
  quantite: number;
  prix: number;
  date: Date;
  disponible: boolean;
};
