export type Articles = {
  id: number;
  article: string;
  id_animaux: number;
  prix: number;
  disponible: boolean;
  stock: number;
};

export type ArticlesUpd = {
  id: number;
  article: string;
  id_animaux: number;
  animal: string;
  prix: number;
  disponible: boolean;
  stock: number;
};
