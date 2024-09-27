export type Commandes = {
  id: number;
  id_article: number;
  id_ticket: number;
  numero: number;
  date: Date;
  date_visite: Date;
  prix: number;
  quantité: number;
};

export type CommandesUpd = {
  id: number;
  id_article: number;
  article: string;
  id_ticket: number;
  ticket: string;
  numero: number;
  quantité: number;
  prix: number;
  date: Date;
  date_visite: Date;
};
