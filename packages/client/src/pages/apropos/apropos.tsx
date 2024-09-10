import parc from "../../images/parc.webp";
import cottage from "../../images/cottage.webp";
import sousmarin from "../../images/sousmarin.webp";
import CarouselSlider from "../../components/carouselSlider";
import { fetchCategories } from "../../api/fetchers/categories";
import { CategorieWithPhoto } from "../../types/produits";
import { useQuery } from "@tanstack/react-query";
import PrimaryButton from "../../components/buttonPrincipale";
import { List, ListItem } from "@mui/material";

import * as S from "./apropos.styled";

interface ProductsData {
  results: CategorieWithPhoto[];
}

const Apropos: React.FC = () => {
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
      <S.FlexContainer>
        <S.ImageButtonContainer>
          <S.StyledImage src={parc} alt="parc" />
          <S.ButtonContainer>
            <PrimaryButton label="Réserver" />
          </S.ButtonContainer>
        </S.ImageButtonContainer>
        <S.ImageButtonContainer>
          <S.StyledImage src={cottage} alt="cottage" />
          <S.TextContainer>
            <S.StyledTypography variant="h6">NOS COTTAGES</S.StyledTypography>
            <S.StyledTypography variant="body1">
              Réservez nos cottages sur mesures :
            </S.StyledTypography>
            <List sx={{ textAlign: "center" }}>
              <ListItem>
                <S.StyledTypography variant="body1">
                  - la famille ours;
                </S.StyledTypography>
              </ListItem>
              <ListItem>
                <S.StyledTypography variant="body1">
                  - la famille loup;
                </S.StyledTypography>
              </ListItem>
              <ListItem>
                <S.StyledTypography variant="body1">
                  - la famille lion;
                </S.StyledTypography>
              </ListItem>
            </List>
            <S.StyledTypography variant="body1">
              et ainsi profitez d’instants privilegié avec vos animaux préférés
            </S.StyledTypography>
          </S.TextContainer>
          <S.ButtonContainer>
            <PrimaryButton label="Réserver" />
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
            <PrimaryButton label="Réserver" />
          </S.ButtonContainer>
        </S.ImageButtonContainer>
      </S.FlexContainer>
      <S.CarouselContainer>
        <CarouselSlider imagesArray={imagesArray} />
      </S.CarouselContainer>
    </S.MainContainer>
  );
};

export default Apropos;
