import axios from "../../axios";
import { ProduitsWithPhoto } from "../../types/produits";

interface ProductsData {
  results: ProduitsWithPhoto[];
}

type Params = {
  raceId: string | undefined;
};

export const fetchRaces = async ({ raceId }: Params): Promise<ProductsData> => {
  const response = await axios.get<ProductsData>(`/photosraces/${raceId}`);
  return response.data;
};
