// import {  useMediaQuery } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import logo from "../../images/logo.gif";
// import FFB from "../../images/FFB-Grand-Paris.jpeg";
// import QUALIBAT from "../../images/qualibat rge.jpg";
// import RGE from "../../images/RGE QUALIBAT .jpeg";
// import { Helmet } from "react-helmet";
// import { useLocation } from "react-router-dom";
// import { Routes } from "../../app/routes";
// import { theme } from "../../app/app";
import React from "react";

import * as S from "./footer.styled";

const Home: React.FC = () => {
  // const location = useLocation();
  // const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const smallScreen = useMediaQuery(theme.breakpoints.down(450));

  // if (location.pathname === Routes.cartproduit) {
  //   return null;
  // }

  return (
    <S.MainContainer>
      {/* <Helmet>
        <title>ABS Couverture</title>
        <meta
          name="ABS Couverture"
          content="Entreprise générale de couverture"
        />
        <meta
          name="téléphone, email, logo, adresse, copyright - ABS Couverture"
          content="Entreprise générale de couverture"
        />
      </Helmet> */}
      {/* <Grid
        container
        sx={{
          " & .MuiGrid-root": {
            padding: 0,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          },
        }}
      >
        <Grid item xs={4}>
          <S.Item>
            <S.ImgContainer>
              <img src={FFB} alt="FFB" width="100%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
        <Grid item xs={4}>
          <S.Item>
            <S.ImgContainer>
              <img src={QUALIBAT} alt="QUALIBAT" width="60%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
        <Grid item xs={4}>
          <S.Item>
            <S.ImgContainer>
              <img src={RGE} alt="RGE" width="40%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <S.Item>
            01 80 91 49 82
            <br />
            09 86 60 00 07
          </S.Item>
        </Grid>
        <Grid item xs={4}>
          <S.Item>
            129 quai de la Pie
            <br />
            94100 Saint-Maur-{smallScreen && <br />}des-Fossés
          </S.Item>
        </Grid>
        <Grid item xs={4}>
          <S.Item>abscouverture{smallScreen && <br />}@gmail.com</S.Item>
        </Grid>
      </Grid>
      <Grid
        container
        ml={0}
        sx={{
          " & .MuiGrid-root": {
            padding: 0,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            mt: { xs: 0, sm: 2, md: 4 },
            pb: { xs: 2, sm: 1, md: 0 },
          },
        }}
      >
        <Grid item xs={4} marginTop={2}>
          <S.Item>
            ABS COUVERTURE<S.TestSup>R</S.TestSup>
          </S.Item>
        </Grid>
        <Grid item xs={4}>
          <S.Item>
            <img src={logo} alt="logo" width="18%" />
          </S.Item>
        </Grid>
        <Grid item xs={4} marginTop={2}>
          <S.Item>
            <Typography variant="body1" sx={{ color: "red", width: "100%" }}>
              © 2023 ABS COUVERTURE. {mediumScreen && <br />} Tous Droits
              Réservés.
            </Typography>
          </S.Item>
        </Grid>
      </Grid> */}
    </S.MainContainer>
  );
};

export default Home;
