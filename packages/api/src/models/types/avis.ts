export type Avis = {
  id: string;
  message: string;
  note: string;
  email: string;
  id_user: number;
  id_sujet: string;
};

// export type UserCreate = {
//   id: string;
//   nom: string;
//   prenom: string;
//   email: string;
//   id_role: number;
//   password: string;
// };

export type Sujets = {
  id: number;
  sujet: string;
};
