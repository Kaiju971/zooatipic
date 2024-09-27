import axios from "../../axios";
import { CommandesReponse } from "../../types/commandes";
import { Basket } from "../../types/panier";

export const fetchCommande = async (
  data: Basket
): Promise<CommandesReponse> => {
  const response = await axios.post<CommandesReponse>("/createcommande", data);
  return response.data;
};
