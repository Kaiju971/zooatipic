export type Stock = {
  id_nourriture: number;
  quantité: number;
  prix: number;
  date: Date;
  disponible: boolean;
};

export type StockUpd = {
  id: number;
  id_nourriture: number;
  nourriture: string;
  quantité: number;
  prix: number;
  date: Date;
  disponible: boolean;
};
