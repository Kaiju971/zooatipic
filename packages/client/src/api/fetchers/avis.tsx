import axios from "../../axios";
import { AvisShowType } from "../../types/avis";

interface AvisData {
  results: AvisShowType[];
}

export const getAvis = async (): Promise<AvisData> => {
  const response = await axios.get<AvisData>("/avis");
  return response.data;
};
