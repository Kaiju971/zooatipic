import { Avatar, Box, Button, Input } from "@mui/material";
import { styled } from "@mui/material/styles";

const sharedStyleBox = `
   background-color: #00000027;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      border-radius: 10px;
`;

export const MainContainer = styled("div")`
  padding-top: 4vh;
  padding-bottom: 4vh;
  width: 100%;

  @media (max-width: 750px) {
    align-items: center;
  }
`;

export const ImgContainer = styled("div")`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 70% 30%;
  width: 35%;
  height: 50vh;
  ${sharedStyleBox};

  @media (max-width: 750px) {
    width: 100%;
    height: 50%;
  }
`;

export const FlexContainer = styled("div")`
  display: flex;
  justify-content: space-around;
  width: 80%;
`;

export const Img = styled("img")`
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 10px;
  opacity: 0.4;
  grid-column: 1;
  grid-row: 1 / span 2;

  @media (max-width: 750px) {
    height: 30vh;
  }
`;

export const StyledBox = styled("div")`
  ${sharedStyleBox}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: auto;
  padding: 1.2rem;

  & .MuiTextField-root {
    border-radius: 10px;
    border-block-color: ${({ theme }) => theme.palette.secondary.main};
    background-color: ${({ theme }) => theme.palette.secondary.main};
    box-shadow: 0px 4px 4px gray inset;
  }

  @media (max-width: 750px) {
    width: 100%;
  }
`;

export const ButtonSubmit = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 10px;
  height: 5vh;
  margin-top: 2rem;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;

  @media (max-width: 750px) {
  }
`;

export const FlexBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const FlexBoxTitle = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;

  @media (max-width: 750px) {
    display: none;
  }
`;

export const FlexBoxMain = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const Title = styled(Box)`
  display: none;

  @media (max-width: 750px) {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    align-items: center;
    flex-direction: column;
    padding-left: 0%;
    padding-right: 0%;
  }
`;

export const DivUpload = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;

  @media (max-width: 750px) {
    width: 10vw;
    height: 10vh;
  }
`;

export const ImgProduit = styled("img")`
  width: 10vw;
  grid-column: 1;
  grid-row: 1;

  @media (max-width: 750px) {
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 12rem;
  height: 12rem;
  grid-row: 1;
  grid-column: 1;
  justify-self: center;
  align-self: center;

  @media (max-width: 960px) {
    width: 10rem;
    height: 10rem;
  }
`;

export const StyledInput = styled(Input)`
  opacity: 0;
  grid-row: 1;
  grid-column: 1;
  justify-self: center;
  align-self: center;
`;
