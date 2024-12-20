import { ImageList, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";

export const MainContainer = styled("div")<{ background: string | undefined }>`
  text-align: center;
  min-height: 100vh;
  color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  flex-direction: column;
  padding-left: 0.5vw;
  padding-top: 20vh;
  background-color: ${({ background, theme }) =>
    background ? background : theme.palette.primary.main};

  /* @media (max-width: 750px) {
    align-items: center;
    height: 100%;
  } */
`;

export const FlexContainer = styled("div")`
  text-align: center;
  display: flex;
  height: 100%;
  margin-bottom: 5rem;

  @media (max-width: 750px) {
    align-items: center;
    height: 100%;
  }
`;

export const BreadcrumbsContainer = styled("div")`
  padding-top: 10vh;
  padding-left: 1vw;
  font-style: italic;
  width: 4vw;
`;

export const StyledImageBox = styled("div")`
  width: 98vw;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 14% 43% 43%;
  align-items: center;
  justify-items: center;
`;

export const Titre = styled(Typography)`
  grid-column: 1 / span 2;
  grid-row: 1;
  padding-bottom: 2vh;
`;

export const Image = styled("img")`
  grid-column: 1;
  grid-row: 2;
  width: 16rem;
  /* height: 100%; */
  border-radius: 10%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  margin: 0.5rem;
`;

export const ContainerTexte = styled("div")`
  grid-column: 2;
  grid-row: 2 / span 2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  border-radius: 10%;
  background-color: ${({ theme }) => theme.palette.colorGris.main};
`;

// Définition des animations
const scanerX = keyframes`
  to {top: 13rem; background-position: bottom center;}
`;

const scanerY = keyframes`
  0% {opacity: .1;}
  5% {opacity: 1;}
  50% {opacity: 1;}
  55% {opacity: .6;}
  100% {opacity: .6;}
`;

const soportes = keyframes`
  to {top: 13rem;}
`;

interface StyledImageScanProps {
  image1: string;
  image2: string;
}

export const StyledImageScan = styled("div")<StyledImageScanProps>`
  grid-column: 1;
  grid-row: 3;

  position: relative;
  width: 16rem;
  height: 16rem;

  border-left: 4px solid #eeeeee;
  border-right: 4px solid #eeeeee;
  margin: 0 15px;

  box-shadow: 0 0 1px #000, 0 0 1px #000 inset, 0 0 4px rgba(0, 0, 0, 0.4),
    0 0 4px rgba(0, 0, 0, 0.4) inset, 0 0 6px 2px rgba(0, 0, 0, 0.4),
    0 0 6px 2px rgba(0, 0, 0, 0.4) inset;
  background: url(${(props) => props.image1}) no-repeat top center;
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 15.5rem;
    height: 50px;
    border: 1px solid #000;
    background: url(${(props) => props.image2}) no-repeat top center;
    background-size: 16rem 16rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.35);
    animation: ${scanerX} 5s linear alternate infinite,
      ${scanerY} 10s linear infinite;
    opacity: 1;
  }
`;

export const ImageScanItem = styled(ImageList)`
  content: "";
  position: absolute;
  top: -10px;
  width: 30px;
  height: 70px;
  background-color: #333;
  box-shadow: 0 0 5px #333;
  z-index: 5;
  animation: ${soportes} 5s linear alternate infinite;

  &:first-of-type {
    left: 0;
    border-radius: 0 10px 10px 0;
  }

  &:last-of-type {
    right: 0;
    border-radius: 10px 0 0 10px;
  }
`;
