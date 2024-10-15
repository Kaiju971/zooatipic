import axios from "../../axios";
import { Articles } from "../../types/produits";

interface ProductsData {
  results: Articles[];
}

type Params = {
  categorieVentes?: string;
};

export const fetchArticles = async ({
  categorieVentes,
}: Params): Promise<ProductsData> => {
  const url = categorieVentes ? `/articles/${categorieVentes}` : `/articles`; // Ajustement ici
  const response = await axios.get<ProductsData>(url); // Le type de réponse doit correspondre (liste d'articles)
  return response.data;
};
