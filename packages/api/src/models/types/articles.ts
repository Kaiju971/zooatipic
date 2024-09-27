export type articles = {
  id: number;
  article: string;
  id_animaux: number;
  prix: number;
  disponible: boolean;
};

export type articlesUpd = {
  id: number;
  article: string;
  id_animaux: number;
  animal: string;
  prix: number;
  disponible: boolean;
};
