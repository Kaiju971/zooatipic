import axios from "../../axios";
import { ArticleWithPhoto } from "../../types/produits";

interface ProductsData {
  results: ArticleWithPhoto[];
}

type Params = {
  categorieVentes: string;
};

export const fetchArticlesWithPhotos = async ({
  categorieVentes,
}: Params): Promise<ProductsData> => {
  const response = await axios.get<ProductsData>(
    `/getphotosarticles/${categorieVentes}`
  );
  return response.data;
};
