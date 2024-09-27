export type Races = {
  id: number;
  race: string;
  id_animaux: number;
};

export type RacesCreate = {
  id: number;
  race: string;
  id_animaux: number;
};

export type Animaux = {
  id: number;
  animal: string;
};

export type Images = {
  id: number;
  id_animal: number;
  id_race: number;
  principale: boolean;
  lien: string;
  id_article: number;
};

export type DataImages = {
  id_animal: number | null;
  id_race: number | null;
  principale: boolean;
  id_article: number | null;
};

export type ImagesUpd = {
  id: number;
  animal: string;
  id_animal: number | null;
  id_race: number | null;
  race: string;
  id_article: number | null;
  article: string;
  principale: boolean;
  lien: string;
};
