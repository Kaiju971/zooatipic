import axios from "../../axios";
import { Commandes, CommandesReponse } from "../../types/commandes";

export const fetchCommande = async (
  data: Commandes[]
): Promise<CommandesReponse> => {
  const response = await axios.post<CommandesReponse>("/createcommande", data);
  return response.data;
};
