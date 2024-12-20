export type Commandes = {
  id: number;
  id_user: number;
  id_article: number;
  id_ticket: number;
  numero: number;
  date: Date;
  date_visite: Date;
  prix: number;
  quantite: number;
  somme: number;
  tva: number;
};

export type CommandesHead = {
  id_user: number;
  // numero: number;
  date: Date;
  quantite: number;
  somme: number;
  tva: number;
};

export type DataRows = {
  id_commande: number;
  id_article: number;
  prix: number;
  quantite: number;
  somme: number;
  tva: number;
  date_visite: string;
};

export type CommandesRows = {
  id_commande: number;
  id_article: number;
  categorie_ventes: string;
  prix: number;
  quantite: number;
  somme: number;
  tva: number;
  date_visite: string;
};

export type CommandesUpd = {
  id: number;
  id_article: number;
  article: string;
  id_ticket: number;
  ticket: string;
  numero: number;
  quantite: number;
  prix: number;
  date: Date;
  date_visite: Date;
};
