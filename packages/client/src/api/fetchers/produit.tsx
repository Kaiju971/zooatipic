import axios from "../../axios";
import { CategorieWithPhoto } from "../../types/produits";

interface ProductsData {
  results: CategorieWithPhoto[];
}

export const fetchProducts = async (): Promise<ProductsData> => {
  const response = await axios.get<ProductsData>("/photoscategorie");
  return response.data;
};
