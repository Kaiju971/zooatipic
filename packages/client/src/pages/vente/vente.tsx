import React from "react";
import { Typography } from "@mui/material";
import CarouselVente from "../../components/carouselVerticalVente/carouselVerticalVente";

import * as S from "./vente.styled";

const Vente: React.FC = () => {
  return (
    <S.MainContainer>
      <Typography variant="h1">VENTE</Typography>
      <CarouselVente />
    </S.MainContainer>
  );
};

export default Vente;
