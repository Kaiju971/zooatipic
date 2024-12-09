export type Avis = {
  message: string;
  note: number;
  id_user: number;
  id_sujet: number;
};

export type Sujets = {
  id: number;
  sujet: string;
};

export type AvisShowType = {
  message: string;
  note: number;
  sujet:string;
  prenom: string;
};
