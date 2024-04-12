import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  @media (max-width: 750px) {
    display: block;
  }
`;

export const InerContainer = styled("div")`
width: 50%;
@media (max-width: 750px) {
  display: block;
  width: 100%;
}
@media (max-width: 390px) {
  width: 100%;
}
`;

export const FlexContainer = styled("div")`
  display: flex;
  width: 100%;

  @media (max-width: 750px) {
    align-items: center;
    flex-direction: column;
  }
`;

export const Texte = styled("div")`
  width: 50%;
  height: 575px;
  @media (max-width: 750px) {
    display: block;
    width: 100%;
  }
  @media (max-width: 390px) {
    width: 100%;
  }
`;

export const Img = styled("img")`
  width: 50vw;

  @media (max-width: 750px) {
    width: 100vw;
    height: 25vh;
  }
`;

export const Carte = styled("img")`
  width: 100vw;

  @media (max-width: 750px) {
    width: 100vw;
    height: 25vh;
  }
`;
