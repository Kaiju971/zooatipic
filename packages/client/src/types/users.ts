export type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  id_role: number;
  image: { data: Uint8Array | null };
};
