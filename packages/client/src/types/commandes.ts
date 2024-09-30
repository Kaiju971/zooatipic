export type Commandes = {
  id_user: number;
  date: string;
  date_visite: string;
  numéro: number;
  id_article: number;
  prix: number;
  article: string;
  quantite: number;
  stock: number;
};

export type CommandesReponse = {
  id: number;
  numéro: number;
};
