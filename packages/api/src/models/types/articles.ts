export type Articles = {
  id: number;
  article: string;
  id_animaux: number;
  animal: string;
  prix: number;
  disponible: boolean;
  stock: number;
  id_groupe_tickets: number;
  groupe_tickets: string;
};

export type ArticlesUpd = {
  id: number;
  article: string;
  id_animaux: number;
  animal: string;
  prix: number;
  disponible: boolean;
  stock: number;
  id_groupe_tickets: number;
  groupe_tickets: string;
};

export type GroupeTickets = {
  id: number;
  groupe_tickets: string;
};
