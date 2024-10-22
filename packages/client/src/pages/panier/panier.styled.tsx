import { styled } from "@mui/material/styles";
import panier from "../../images/background_panier.jpg";
import { Button, Radio, Typography } from "@mui/material";

export const FlexBox = styled("div")`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
`;

export const FlexBoxCentered = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding-top: 4vh;
  position: relative;
  margin-bottom: 3%;
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
  margin-right: 10%;
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
  margin-bottom: 5%;
  margin-right: 10%;
  z-index: 10;

  & > * {
    width: 100%;
    border: 1px solid black;
    background-color: ${({ theme }) => theme.palette.colorGris.main};
    text-align: center;
    padding-top: 3%;
    padding-bottom: 3%;
  }
`;

type Props = {
  disabled?: boolean;
};

export const ButtonContainer = styled("div")<Props>(
  ({ disabled = false, theme }) => ({
    position: "absolute",
    bottom: "-0.5%",
    right: "-0.5%",
    width: "20rem",
    backgroundColor: disabled
      ? theme.palette.colorBackgroundForm.main
      : theme.palette.colorVertButton.main,
    clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 30% 0%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      color: theme.palette.vert.main,
    },
  })
);

export const ButtonContainerLivraison = styled(ButtonContainer)`
  bottom: -2%;
  right: -1.2%;
`;

export const DividerWithText = styled("div")`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px dashed #000;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

export const FormContainer = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 4vh;
`;

export const StyledRadio = styled(Radio)`
  color: ${({ theme }) => theme.palette.colorVertButton.main};
  &.Mui-checked {
    color: ${({ theme }) => theme.palette.colorVertButton.main};
  }
`;

export const GridForm = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 35% 15% 35%;
  justify-items: start;
  align-items: center;
`;

export const Sell1 = styled(Typography)`
  grid-column: 1;
  grid-row: 1;
`;

export const Sell2 = styled("div")`
  grid-column: 2;
  grid-row: 1;
`;
export const Sell3 = styled(Typography)`
  grid-column: 1;
  grid-row: 2;
`;
export const Sell4 = styled("div")`
  width: 100%;
  grid-column: 2 / span 2;
  grid-row: 2;
`;
export const Sell5 = styled(Typography)`
  grid-column: 1;
  grid-row: 3;
`;
export const Sell6 = styled("div")`
  grid-column: 2;
  grid-row: 3;
`;
export const Sell7 = styled(Typography)`
  grid-column: 3;
  grid-row: 3;
`;
export const Sell8 = styled("div")`
  grid-column: 4;
  grid-row: 3;
`;
