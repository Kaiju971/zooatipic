export type Nourritures = {
  id: number;
  nourriture: string;
  id_animaux: number;
  prix: number;
  disponible: boolean;
};

export type NourrituresUpd = {
  id: number;
  nourriture: string;
  id_animaux: number;
  animal: string;
  prix: number;
  disponible: boolean;
};
