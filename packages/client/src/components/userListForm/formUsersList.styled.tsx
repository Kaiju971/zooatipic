import { Avatar, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  padding-top: 4vh;
  padding-bottom: 4vh;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.colorBackgroundForm1.main};
  color: ${({ theme }) => theme.palette.colorVertMenu.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  @media (max-width: 750px) {
  }
`;

export const StyledBox = styled(Box)`
  padding-top: 2vh;
  text-align: center;
  color: ${({ theme }) => theme.palette.colorVertMenu.main};

  & .MuiTextField-root {
    margin: 0.5rem;
    display: inline-block;
    width: 10vw;
    text-align: center;

    @media (max-width: 750px) {
      width: 60vw;
    }
  }

  & .MuiInputBase-input {
    text-align: center;
  }
`;

export const FlexBox = styled("div")`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 4vw;
  padding-top: 2vh;
`;

export const GridContainer = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 5% 15% 15% 15% 15% 15% 10% 10%;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const GridContainerTitre = styled(GridContainer)`
  @media (max-width: 750px) {
    display: none;
  }
`;

export const GridContainerMain = styled(GridContainer)`
  & .MuiInputBase-root {
    font-size: 0.8rem;
    @media (max-width: 750px) {
      font-size: 1rem;
    }
  }

  & .MuiTypography-root {
    @media (max-width: 750px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 750px) {
    grid-template-columns: 100%;
    align-items: center;
    font-size: 0.5rem;
  }
`;

export const TextFieldContainer = styled("div")`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};

  @media (max-width: 750px) {
  }
`;

export const ButtonMod = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 10px;

  @media (max-width: 1200px) {
    width: 5vw;
    border-radius: 4px;
    margin: 1px;
    padding: 0.7rem;
  }

  @media (max-width: 960px) {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    padding-right: 0px;
    padding-left: 0;
  }

  @media (max-width: 750px) {
    width: 20vw;
    height: 4vh;
  }

  @media (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 5rem;
  height: 5rem;

  justify-self: center;
  align-self: center;
`;
