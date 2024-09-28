export type Commandes = {
  id: number;
  id_user: number;
  date: Date;
  date_visite: Date;
  numéro: number;
  id_article: number;
  prix: number;
  article: string;
  quantite: number;
};

export type CommandesReponse = {
  id: number;
  numéro: number;
};
