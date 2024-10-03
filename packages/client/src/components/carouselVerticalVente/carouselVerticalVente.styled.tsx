import styled from "@emotion/styled";
import { Typography } from "@mui/material";
const ArrayColors = ["#FF0000", "#2E8F6C", "#9D6F16"];

export const MainContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 5rem;
`;
export const Image = styled("img")<{ indexCouleurs: number }>`
  width: 30%;
  height: 30%;
  border-radius: 10%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border: 4px solid;
  border-color: ${({ indexCouleurs }) => ArrayColors[indexCouleurs]};
`;

export const ImgContainer = styled("div")`
  width: 100%;
  height: 60%;

  padding-left: 27%;
`;

export const FlexContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTypography = styled(Typography)<{ indexCouleurs: number }>`
  color: ${({ indexCouleurs }) => ArrayColors[indexCouleurs]};
  width: 40%;
  padding-left: 2rem;
`;
