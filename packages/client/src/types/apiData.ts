export type AuthData = {
  success: boolean;
  user: {
    user_id: string;
    email: string;
    nom: string;
    prenom: string;
    auth_token: string;
    id_role: number;
    role: string;
  };
};
