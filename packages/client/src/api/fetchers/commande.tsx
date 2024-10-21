import axios from "../../axios";
import {
  CommandesHead,
  CommandesReponse,
  CommandesRows,
} from "../../types/commandes";

type CommandeData = {
  commande: CommandesHead;
  commandeRows: CommandesRows[];
};

export const fetchCommande = async (
  data: CommandeData
): Promise<CommandesReponse> => {
  const response = await axios.post<CommandesReponse>("/createcommande", data);
  return response.data;
};
