import { Breadcrumbs, Link, Typography } from "@mui/material";
import axios from "../../axios";
import { useQuery } from "@tanstack/react-query";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Categorie } from "../../types/produits";

import * as S from "./produits.styled";

interface ProductsData {
  results: Categorie[][];
}

const fetchProducts = async (): Promise<ProductsData> => {
  const response = await axios.get<ProductsData>("/animaux");
  return response.data;
};

const ArrayLiens = [
  "horaires",
  "cottages",
  "sous-marine",
  "tarifs",
  "laboratorie",
];

const Produits: React.FC = () => {
  const {
    data: categoriedata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["getanimaux"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  // useEffect(() => {
  //   const params = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   try {
  //     request("GET", `categorieswithphotos`, params, setCategoriedata);
  //   } catch (error: any) {
  //     setError(error.message || error);
  //   }
  // }, [request, setError]);

  return (
    <div>
      <S.MainContainer>
        <S.BreadcrumbsContainer>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<DoubleArrowIcon fontSize="small" color="primary" />}
          >
            <Link underline="hover" color="inherit" href="/">
              <Typography variant="body2" color="primary.main">
                Accueil
              </Typography>
            </Link>
            <Typography variant="body2">Produits</Typography>
          </Breadcrumbs>
        </S.BreadcrumbsContainer>
        <Typography variant="h1">NOS RESIDENTS</Typography>
        <S.GridContainer>
          {categoriedata &&
            categoriedata.results.length > 0 &&
            categoriedata.results[0].map((item) => (
              <div key={item.id}>{item.animal}</div>
            ))}
          {ArrayLiens.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </S.GridContainer>
      </S.MainContainer>
    </div>
  );
};

export default Produits;


