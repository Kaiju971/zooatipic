import React from "react";
import {
  StyledAppBar,
  StyledToolbar,
  StyledTypography,
  StyledSlider,
  StyledSliderItem,
  MainContainer,
  CenterContainer,
  FlexContainer,
  InerBoxContainer,
  RouteContainer,
} from "./notFound.styled";
import { Helmet } from "react-helmet";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const jokes = [
  "Pourquoi les charpentiers sont-ils de bons danseurs ? Parce qu'ils ont le rythme dans la peau !",
  "Pourquoi les couvreurs ne portent-ils jamais de cravate ? Parce qu'ils ont toujours le vent en poupe !",
  "Quel est le comble pour un charpentier ? De se faire clouer le bec !",
  "Pourquoi les couvreurs sont-ils toujours de bonne humeur ? Parce qu'ils ont toujours un toit au-dessus de leur tête !",
];

const NotFoundPage: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (
    <MainContainer>
      <Helmet>
        <title>page Erreur</title>
        <meta
          name="Erreur - ABS Couverture"
          content="Entreprise générale de couverture"
        />
      </Helmet>
      <MainContainer>
        <StyledAppBar position="static">
          <StyledToolbar></StyledToolbar>
        </StyledAppBar>

        <CenterContainer>
          <FlexContainer>
            <InerBoxContainer>
              <StyledTypography style={{ marginTop: "3rem" }} variant="h3">
                Erreur 404
              </StyledTypography>
              <hr />
              <StyledTypography variant="body1">
                La page que vous cherchez n'existe pas.
              </StyledTypography>
              <hr />
              <StyledTypography variant="h5">
                Charpente & Couverture
              </StyledTypography>
            </InerBoxContainer>

            <InerBoxContainer>
              <StyledTypography variant="h5">
                Dirrigez-vous plutôt sur ces pages
              </StyledTypography>
              <RouteContainer>
                <Link
                  style={{
                    display: "block",
                    color: "white",
                    cursor: "pointer",
                    margin: ".4rem",
                    fontWeight: "bold",
                  }}
                  to="/"
                >
                  Accueil
                </Link>
                <Link
                  style={{
                    display: "block",
                    color: "white",
                    cursor: "pointer",
                    margin: ".4rem",
                    fontWeight: "bold",
                  }}
                  to="/produits"
                >
                  Produits
                </Link>
                <Link
                  style={{
                    display: "block",
                    color: "white",
                    cursor: "pointer",
                    margin: ".4rem",
                    fontWeight: "bold",
                  }}
                  to="/contact"
                >
                  Contact
                </Link>
                <Link
                  style={{
                    display: "block",
                    color: "white",
                    cursor: "pointer",
                    margin: ".4rem",
                    fontWeight: "bold",
                  }}
                  to="/a-propos-de-nous"
                >
                  Á-propos de nous
                </Link>
                <Link
                  style={{
                    display: "block",
                    color: "white",
                    cursor: "pointer",
                    margin: ".4rem",
                    fontWeight: "bold",
                  }}
                  to="/devis"
                >
                  Devis
                </Link>
                <Link
                  style={{
                    display: "block",
                    color: "white",
                    cursor: "pointer",
                    margin: ".4rem",
                    fontWeight: "bold",
                  }}
                  to="/faconnage"
                >
                  Façonnage
                </Link>
              </RouteContainer>
            </InerBoxContainer>
          </FlexContainer>

          <StyledSlider {...settings}>
            {jokes.map((joke, index) => (
              <StyledSliderItem key={index}>
                <Typography sx={{ color: "black" }} variant="body1">
                  {joke}
                </Typography>
              </StyledSliderItem>
            ))}
          </StyledSlider>
        </CenterContainer>
      </MainContainer>
    </MainContainer>
  );
};

export default NotFoundPage;
