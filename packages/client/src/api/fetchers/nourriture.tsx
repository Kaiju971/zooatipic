import axios from "../../axios";
import { NourritureWithPhoto } from "../../types/produits";

interface ProductsData {
  results: NourritureWithPhoto[];
}

export const fetchNourritures = async (): Promise<ProductsData> => {
  const response = await axios.get<ProductsData>("/getphotosnourritures");
  return response.data;
};
