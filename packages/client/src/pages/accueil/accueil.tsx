import * as S from "./accueil.styled";
import React from "react";
import video from "../../video/videoAccueil.mp4";
import CarouselAccueil from "../../components/carouselAccueil/carouselAccueil";
import { Typography } from "@mui/material";
import laboratoire from "../../images/laboratoire.jpg";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avis from "../../components/avis/avis";

const Home: React.FC = () => {
  return (
    <S.MainContainer>
      <S.VideoContainer>
        <video src={video} autoPlay loop muted />
      </S.VideoContainer>
      <S.GridBox>
        <S.CarouselContainer>
          <CarouselAccueil />
        </S.CarouselContainer>
        <S.TextContainer>
          <Typography variant="h3">BIENVENUE</Typography>
          <Typography variant="h5">
            Notre parc est ouvert à tout public, il vous permettra de vous
            balader en famille ou seul, vous pourrez également vous occuper d’un
            animal de votre choix pendant votre visite si vous le souhaitez.
            Notre parc vous permet de confectionner vous même la nourriture de
            votre animal de compagnie, qui vous attend sagement à la maison,
            mais également notre parc dispose d’un laboratoire où sont
            confectionnés les repas pour que vous puissiez être livré à domicile
            n’hésitez pas et venez nous rendre visite.
          </Typography>
        </S.TextContainer>
        <S.NewsLetter>
          <Box sx={{ "& button": { m: 10 } }}>
            <div>
              <Button variant="contained" size="large"  >
                NEWSLETTER
              </Button>
            </div>
          </Box>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 10, width: "30vw" }, marginLeft:"-10rem",
              
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Size"
                id="outlined-size-medium"
                defaultValue="Medium"
                size="medium"
                
              />
            </div>
          </Box>
        </S.NewsLetter>
        <S.ImgContainer>
          <S.Img src={laboratoire} width="40vw" height="50vh" />
        </S.ImgContainer>
      </S.GridBox>
      <Avis />
    </S.MainContainer>
  );
};

export default Home;
