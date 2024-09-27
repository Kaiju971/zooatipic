import axios from "../../axios";
import { articleWithPhoto } from "../../types/produits";

interface ProductsData {
  results: articleWithPhoto[];
}

export const fetcharticles = async (): Promise<ProductsData> => {
  const response = await axios.get<ProductsData>("/getphotosarticles");
  return response.data;
};
