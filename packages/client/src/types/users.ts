export type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  id_role: number;
  image: { data: Uint8Array | null };
  id_adresse: number;
  numero: string;
  adresse: string;
  code_postal: number;
  ville: string;
};
