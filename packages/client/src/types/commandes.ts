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
  id_adresse: number;
};

export type CommandesReponse = {
  id: number;
  numero: number;
};

export type CommandesHead = {
  id_user: number;
  date: string;
  id_adresse: number;
  quantite: number;
  somme: number;
  tva: number;
};

export type CommandesRows = {
  id_commande: number;
  id_article: number;
  prix: number;
  quantite: number;
  somme: number;
  tva: number;
  categorie_ventes: string;
  date_visite: string;
};
