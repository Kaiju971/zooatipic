import { ImageList, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")<{ background: string | undefined }>`
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  padding-left: 0.5vw;
  padding-top: 25vh;
  background-color: ${({ background, theme }) =>
    background ? background : theme.palette.primary.main};

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

export const Image = styled("img")`
  width: 22vw;
  border-radius: 10%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  margin: 0.5rem;
`;

export const StyledImageList = styled(ImageList)`
  justify-items: center;
  align-items: center;
`;

export const StyledImageBox = styled("div")`
  width: 98vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const ContainerTexte = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 30%;
  height: 20rem;
  border-radius: 10%;
  background-color: ${({ theme }) => theme.palette.colorGris.main};
`;

export const StyledFlexBox = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

// Conteneur principal
export const ContainerGrid = styled("div")`
  width: 24rem;
  height: 24rem;
  padding: 4vh;
`;

// Image stylisée
export const ImageTurn = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-column: 1;
  grid-row: 1;
`;

export const ContainerGeneral = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

export const ImageContainerCommon = styled("div")`
  position: absolute;
  width: 30vw;
  height: 30vw;
  transform-origin: center;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  rotate: 45deg;

  &:hover {
    translate: 0 0;
    rotate: 0deg;
    z-index: 99;
  }
`;

export const ImageContainer1 = styled(ImageContainerCommon)`
  translate: 21vw 0;
  z-index: 9;
`;

export const ImageContainer2 = styled(ImageContainerCommon)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  translate: 0 25vh;
  z-index: 8;

  &:hover .text {
    opacity: 0;
  }
`;

export const StyledTypography = styled(Typography)`
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  justify-self: center;
  margin-top: -6rem;
  margin-left: -6rem;
  rotate: -45deg;
  transition: opacity 1s ease;
`;

export const ImageContainer3 = styled(ImageContainerCommon)`
  translate: -21vw 0;
  z-index: 9;
`;

export const ImageContainer4 = styled(ImageContainerCommon)`
  translate: 0 -42vh;
  z-index: 9;
`;

export const ImageContainerSkull = styled("div")`
  translate: 0 -42vh;
  z-index: 9;
`;