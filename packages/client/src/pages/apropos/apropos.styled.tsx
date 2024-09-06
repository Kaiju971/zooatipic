import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rem;
  padding-bottom: 2rem;
  background-image: linear-gradient(
    180deg,
    #ffffff 0%,
    #82c0e3 55%,
    rgba(184, 186, 108, 0.8) 100%
  );
`;

export const FlexContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
  width: 96vw;
  height: 50vh;
`;

export const ImageButtonContainer = styled("div")`
  position: relative;
  width: 90%;
  height: 90%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

export const StyledImage = styled("img")`
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

export const ButtonContainer = styled("div")`
  position: absolute;
  bottom: -2rem;
  left: 30%;
`;

export const TextContainer = styled("div")`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000075;
  grid-row: 1;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  text-align: center;
  width: 100%;
`;

export const CarouselContainer = styled("div")`
  margin-top: 2vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  background: linear-gradient(
    90deg,
    rgba(177, 217, 202, 0.76) 0%,
    rgba(63, 142, 114, 0.76) 24.5%,
    rgba(48, 106, 85, 0.76) 52%,
    rgba(43, 95, 76, 0.76) 100%
  );
  border: 1px solid #4f91b6;
`;
