import Grid from "@mui/material/Grid";
import ifaw from "../images/ifaw.png";
import spa from "../images/SPA.png";
import wwf from "../images/WWF.png";
import hirobot from "../images/hi-robot.gif";
import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { theme } from "../app/app";
import { useNavigate } from "react-router";

import * as S from "./footer.styled";

const getCurrentYear = (): number => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <S.MainContainer>
      {/* <Helmet>
        <title>ZooAtipic</title>
        <meta
          name="ZOO ATIPIC"
          content="Parc animalier"
        />
        <meta
          name="email, sponsor,copyright - ZooAtipic"
          content="zoo"
        />
      </Helmet> */}
      <Grid
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
        <Grid xs={1.5}>
          <S.Item>
            <S.ImgContainer>
              <img src={ifaw} alt="ifaw" width="70%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
        <Grid xs={1.5}>
          <S.Item>
            <S.ImgContainer>
              <img src={wwf} alt="wwf" width="70%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
        <Grid xs={1.5}>
          <S.Item>
            <S.ImgContainer>
              <img src={spa} alt="spa" width="60%" />
            </S.ImgContainer>
          </S.Item>
        </Grid>
        <Grid xs={2.5}>
          <S.TextContainer>
            <Typography
              variant="h4"
              sx={{ color: "primary.main", width: "100%" }}
            >
              CONTACT
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "primary.main", width: "100%" }}
            >
              informations générales:
              <br />
              info@zooatipic.net
            </Typography>
          </S.TextContainer>
        </Grid>
        <Grid
          xs={2}
          sx={{ color: "primary.main", width: "100%", cursor: "pointer" }}
        >
          <S.Robot src={hirobot} alt="chatbot" />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          " & .MuiGrid-root": {
            paddingTop: 1,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          },
        }}
      >
        <Grid xs={1.5}>
          <Typography
            variant="body1"
            sx={{ color: "primary.main", width: "100%", cursor: "pointer" }}
            onClick={() => navigate("loi/Mentions Légales")} // Navigue vers la section CGV Billetterie
          >
            Mentions légales
          </Typography>
        </Grid>
        <Grid xs={1.5}>
          <Typography
            variant="body1"
            sx={{ color: "primary.main", width: "100%", cursor: "pointer" }}
            onClick={() => navigate(`loi/Billeterie`)}
          >
            CGV Billetterie
          </Typography>
        </Grid>
        <Grid xs={1.5}>
          <Typography
            variant="body1"
            sx={{ color: "primary.main", width: "100%", cursor: "pointer" }}
            onClick={() => navigate("loi/Hébergement")}
          >
            CGV Hébergement
          </Typography>
        </Grid>
        <Grid xs={1.5}>
          <Typography
            variant="body1"
            sx={{ color: "primary.main", width: "100%", cursor: "pointer" }}
            onClick={() => navigate("loi/Règlement")}
          >
            Règlement Intérieur
          </Typography>
        </Grid>
        <Grid xs={1.5}>
          <Typography
            variant="body1"
            sx={{ color: "primary.main", width: "10%", cursor: "pointer" }}
            onClick={() => navigate("loi/FAQ")}
          >
            FAQ
          </Typography>
        </Grid>
        <Grid xs={1.5}>
          <Typography
            variant="body1"
            sx={{ color: "primary.main", width: "100%", cursor: "pointer" }}
            onClick={() => navigate("loi/Politique")}
          >
            Politique de Confidentialité
          </Typography>
        </Grid>
        <Grid xs={2.5}>
          <Typography
            variant="body1"
            sx={{ color: "primary.main", width: "100%" }}
          >
            © {getCurrentYear()} ZooAtipic. {mediumScreen && <br />} Tous Droits
            Réservés.
          </Typography>
        </Grid>
      </Grid>
    </S.MainContainer>
  );
};

export default Footer;
