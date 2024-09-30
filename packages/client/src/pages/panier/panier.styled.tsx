import { styled } from "@mui/material/styles";
import panier from "../../images/bg_panier.webp";
import { Button, Typography } from "@mui/material";

export const MainContainer = styled("div")`
  padding-top: 10vh;
  padding-bottom: 10vh;
  min-height: 100vh;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  & ::before {
    content: "";
    /* background-image: url(${panier}); */
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

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

export const Title = styled(Typography)`
  width: 80%;

  @media (max-width: 750px) {
    display: block;
  }
`;

export const BaskeContainer = styled("div")`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const BasketRow = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 10% 22% 16% 9% 9% 17% 17%;
  padding-bottom: 0.5%;
  justify-items: start;
  align-items: center;
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
    background-color: transparent;
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

export const Total = styled("div")`
  width: 33%;
  align-self: flex-end;
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 0.5%;
  justify-items: start;
  align-items: center;
`;
