export type Stock = {
  id_article: number;
  quantité: number;
  prix: number;
  date: Date;
  disponible: boolean;
};

export type StockUpd = {
  id: number;
  id_article: number;
  article: string;
  quantité: number;
  prix: number;
  date: Date;
  disponible: boolean;
};
