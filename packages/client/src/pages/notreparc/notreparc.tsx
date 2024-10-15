import parc from "../../images/parc.webp";
import cottage from "../../images/cottage.webp";
import sousmarin from "../../images/sousmarin.webp";
import CarouselSlider from "../../components/carouselSlider";
import { fetchCategories } from "../../api/fetchers/categories";
import { CategorieWithPhoto } from "../../types/produits";
import { useQuery } from "@tanstack/react-query";
import PrimaryButton from "../../components/buttonPrincipale";
import { List, ListItem, Typography } from "@mui/material";

import * as S from "./notreparc.styled";
import { Routes } from "../../app/routes";
import { useNavigate } from "react-router";

interface ProductsData {
  results: CategorieWithPhoto[];
}

const Notreparc: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: categoriedata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["photoscategorie"],
    queryFn: fetchCategories,
  });

  const imagesArray = categoriedata?.results?.map((item) => ({
    id: item.id,
    src: item.lien,
    alt: item.animal,
  }));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <S.MainContainer>
      <Typography variant="h1">NOTRE PARC</Typography>
      <S.FlexContainer>
        <S.ImageButtonContainer>
          <S.StyledImage src={parc} alt="parc" />
          <S.ButtonContainer>
            <PrimaryButton
              label="Réserver"
              onClick={() => navigate(Routes.billets)}
            />
          </S.ButtonContainer>
        </S.ImageButtonContainer>
        <S.ImageButtonContainer>
          <S.StyledImage src={cottage} alt="cottage" />
          <S.TextContainer>
            <S.StyledTypography1 variant="h6">NOS COTTAGES</S.StyledTypography1>
            <S.StyledTypography1 variant="body1">
              Réservez nos cottages sur mesures :
            </S.StyledTypography1>
            <List disablePadding sx={{ textAlign: "center" }}>
              <ListItem sx={{ p: 0 }}>
                <S.StyledTypography1 variant="body1">
                  - la famille ours
                </S.StyledTypography1>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <S.StyledTypography1 variant="body1">
                  - la famille loup
                </S.StyledTypography1>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <S.StyledTypography1 variant="body1">
                  - la famille lion
                </S.StyledTypography1>
              </ListItem>
            </List>
            <S.StyledTypography1 variant="body1">
              et ainsi profitez d’instants privilegié avec vos animaux préférés
            </S.StyledTypography1>
          </S.TextContainer>
          <S.ButtonContainer>
            <PrimaryButton
              label="Réserver"
              onClick={() => navigate(Routes.billets)}
            />
          </S.ButtonContainer>
        </S.ImageButtonContainer>
        <S.ImageButtonContainer>
          <S.StyledImage src={sousmarin} alt="sousmarin" />
          <S.TextContainer>
            <S.StyledTypography variant="h6">
              BALADE SOUS MARINE
            </S.StyledTypography>
            <S.StyledTypography variant="body1">
              Qui n’a jamais rêvé de nager avec les poissons!
            </S.StyledTypography>
            <S.StyledTypography variant="body1">
              Une balade pour les puristes et les photographes, vous aurez une
              vue imprennable sur notre aquarium et plongez à la rencontre de
              nos plus beaux spécimens sans se mouiller.
            </S.StyledTypography>
          </S.TextContainer>
          <S.ButtonContainer>
            <PrimaryButton
              label="Réserver"
              onClick={() => navigate(Routes.billets)}
            />
          </S.ButtonContainer>
        </S.ImageButtonContainer>
      </S.FlexContainer>
      <S.CarouselContainer>
        <CarouselSlider imagesArray={imagesArray} />
      </S.CarouselContainer>
    </S.MainContainer>
  );
};

export default Notreparc;
