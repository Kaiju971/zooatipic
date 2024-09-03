export type Produit = {
  id: number;
  titre: string;
  categorie: string;
  id_categorie: number;
  description: string;
  description_general: string;
};

export type Categorie = {
  id: number;
  animal: string;
  photo_principale: string;
};

export type Photo = {
  id_categorie: number;
  id_produit: number;
  principale: boolean;
  src: string;
  general: boolean;
};

export type PhotoUpd = {
  id: number;
  id_categorie: number;
  categorie: string;
  id_produit: number;
  produit: string;
  principale: boolean;
  src: string;
  general: boolean;
};

export type CarouselImg = {
  id: number;
  prod_description: string;
  prod_description_general: string;
  id_categorie: number;
  id_produit: number;
  principale: boolean;
  src: string;
  produit: string;
  categorie: string;
  cat_description: string;
  general: boolean;
};

export type ProduitWithPhoto = {
  id: number;
  titre: string;
  id_categorie: number;
  description: string;
  photo: string;
  categorie: string;
};

export type Roles = {
  id: Number;
  role: string;
};
