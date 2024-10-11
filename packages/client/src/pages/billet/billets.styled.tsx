import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const MainContainer = styled("div")`
  width: 100%;
  height: 100%;
  text-align: center;
  margin-bottom: 10rem;

  @media (max-width: 750px) {
    display: block;
  }
`;
export const Title = styled("div")`
  padding-top: 9rem;
`;

export const TypographyStyled = styled(Typography)`
  border-radius: 5px;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-shadow: inset 1px -1px 5px 1px rgba(217, 217, 217, 0.25); /* Ombre intérieure */
`;

export const GridContainer = styled("div")`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 24% 24% 24% 28%;
  padding-left: 2rem;
`;

export const TicketContainer = styled("div")`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 6rem;
  /* padding-top: 3rem; */
`;

export const Ticket134 = styled(TicketContainer)`
  background: linear-gradient(0deg, #ca7d23 0%, #fcaa30 55%, #382004 100%);
  border: solid;
  border-top-color: #fcaa30;
  border-inline-color: #ca7d23;
  border-bottom-color: #382004;
  border-radius: 10px;
`;

export const Ticket25 = styled(TicketContainer)`
  background: linear-gradient(180deg, #ca7d23 0%, #fcaa30 55%, #382004 100%);
  border: solid;
  border-top-color: #382004;
  border-inline-color: #ca7d23;
  border-bottom-color: #fcaa30;
  border-radius: 10px;
`;

export const Ticket4 = styled(Ticket134)`
  height: 80%;
`;

export const Ticket5 = styled(Ticket25)`
  height: 80%;
`;

export const StyledButton = styled(Button)`
/* 
  padding-top: 2rem;
  box-shadow: "none"; */
`;
export const ButtonContainer1 = styled("div")`
  position: absolute;
  bottom: -3rem;
  left: 4rem;
`;
export const ButtonContainer2 = styled("div")`
  position: absolute;
  bottom: -3rem;
  right: 29rem;
`;
export const ButtonContainer3 = styled("div")`
  position: absolute;
  bottom: -3rem;
  right: 6rem;
  bottom: 10rem;
`;
export const ButtonContainer4 = styled("div")`
  position: absolute;
  bottom: -3rem;
  right: 6rem;
`;
