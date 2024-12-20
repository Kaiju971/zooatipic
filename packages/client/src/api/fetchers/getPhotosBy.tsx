import axios from "../../axios";
import { ProduitsWithPhoto } from "../../types/produits";

interface ProductsData {
  results: ProduitsWithPhoto[];
}

type Params = {
  categorie_photo: string;
  id_animal?: string;
  id_race?: string;
};

export const getPhotosBy = async ({
  categorie_photo,
  id_animal,
  id_race,
}: Params): Promise<ProductsData> => {
  const urlParams = new URLSearchParams({
    ...(id_animal !== undefined && { id_animal: id_animal }),
    ...(id_race !== undefined && { id_race: id_race }),
  });

  const response = await axios.get<ProductsData>(
    `/photosby/${categorie_photo}/idparams?${urlParams}`
  );

  return response.data;
};
