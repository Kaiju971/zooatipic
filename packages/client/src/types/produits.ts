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

export type CategorieWithPhoto = {
  id: number;
  lien: string;
  id_animal: number;
  animal: string;
  background: string;
};

export type ArticleWithPhoto = {
  id: number; //id photo
  lien: string;
  id_animal: number;
  id_article: number;
  article: string;
  prix: number;
  quantite: number;
  stock: number;
};

export type Articles = {
  id: number; //id article
  lien: string;
  id_animal: number;
  article: string;
  prix: number;
  quantite: number;
  stock: number;
  groupe_tickets: string;
};

export type ProduitsWithPhoto = {
  id: number;
  lien: string;
  id_race: number;
  race: string;
  description: string;
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
  src: string;
  alt: string;
};

export type Roles = {
  id: Number;
  role: string;
};
