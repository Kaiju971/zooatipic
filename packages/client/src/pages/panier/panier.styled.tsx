import { styled } from "@mui/material/styles";
import panier from "../../images/background_panier.jpg";
import { Button, Typography } from "@mui/material";

export const FlexBox = styled("div")`
  display: flex;
  align-items: start;
  justify-content: center;
`;

export const MainContainer = styled("div")`
  padding-top: 10vh;
  min-height: 100vh;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-image: url(${panier});
  background-size: cover;
  background-repeat: no-repeat;

  /* & ::before {
    content: "";
    background-image: url(${panier});
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  } */

  @media (max-width: 750px) {
    display: block;
  }
`;

export const PageTitle = styled(Typography)`
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BasketContainer = styled("div")`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding-top: 4vh;
  position: relative;
`;

export const BasketRow = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 30% 15% 15% 15% 5%;
  padding-bottom: 0.5%;
  justify-items: start;
  align-items: center;
  padding-left: 2vw;
`;

export const Triangle = styled("div")`
  position: absolute;
  bottom: -0.5%;
  left: -0.5%;
  width: 0;
  height: 0;
  border-right: 200px solid transparent;
  border-bottom: 200px solid;
  border-bottom-color: ${({ theme }) => theme.palette.vert.main};
`;

export const Triangle2 = styled("div")`
  width: 0;
  height: 0;
  position: absolute;
  right: 0;
  top: 50%;
  border-top: 200px solid transparent;
  border-bottom: 200px solid transparent;
  border-right: 100px solid;
  border-right-color: ${({ theme }) => theme.palette.vert2.main};
  transform: translateY(-50%);
`;

export const ImageStock = styled(FlexBox)`
  padding-left: 4vw;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const Article = styled(Typography)`
  font-weight: 700;
`;

export const Calculator = styled("div")`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: solid 0.5px;
  border-radius: 10px;
`;

export const StyledButton = styled(Button)`
  font-size: 1.2rem;

  &.MuiButtonBase-root:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 900;
  }
`;

export const StyledButtonMoins = styled(StyledButton)`
  color: ${({ theme }) => theme.palette.colorRougeOpacity.main};
`;

export const Somme = styled(Typography)`
  font-weight: 900;
  background-color: ${({ theme }) => theme.palette.colorGris.main};
`;

export const Title = styled(Typography)`
  width: 33%;
  align-self: flex-end;

  @media (max-width: 750px) {
    display: block;
  }
`;

export const Total = styled("div")`
  width: 33%;
  align-self: flex-end;
  display: grid;
  grid-template-columns: 50% 50%;
  padding-top: 1%;
  padding-bottom: 1%;
  justify-items: start;
  align-items: center;
  margin-bottom: 4%;
  margin-right: 1%;

  & > * {
    width: 100%;
    border: 1px solid black;
    background-color: ${({ theme }) => theme.palette.colorGris.main};
    text-align: center;
  }
`;
