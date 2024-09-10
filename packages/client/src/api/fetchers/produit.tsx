import axios from "../../axios";
import { ProduitsWithPhoto } from "../../types/produits";

interface ProductsData {
  results: ProduitsWithPhoto[];
}

type Params = {
  animalId: string | undefined;
};

export const fetchProducts = async ({
  animalId,
}: Params): Promise<ProductsData> => {
  const response = await axios.get<ProductsData>(`/photosproduits/${animalId}`);
  return response.data;
};
