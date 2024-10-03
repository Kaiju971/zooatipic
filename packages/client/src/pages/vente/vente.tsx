import React from "react";
import { Typography } from "@mui/material";
import { fetchCategories } from "../../api/fetchers/categories";
import { CategorieWithPhoto } from "../../types/produits";
import { useQuery } from "@tanstack/react-query";
import CarouselVente from "../../components/carouselVerticalVente/carouselVerticalVente";

import * as S from "./vente.styled";

interface ProductsData {
  results: CategorieWithPhoto[];
}

const Vente: React.FC = () => {
  const { isLoading, isError } = useQuery<ProductsData>({
    queryKey: ["photoscategorie"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;
  return (
    <S.MainContainer>
      <Typography variant="h1">VENTE</Typography>
      <CarouselVente />
    </S.MainContainer>
  );
};

export default Vente;
