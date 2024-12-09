import axios from "../../axios";
import { Sujets } from "../../types/avis";

interface SujetsData {
  results: Sujets[];
}

export const fetchSujets = async (): Promise<SujetsData> => {
  const response = await axios.get<SujetsData>("/sujets");
  return response.data;
};
