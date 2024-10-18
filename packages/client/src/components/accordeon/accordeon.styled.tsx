import { Typography } from "@mui/material";
import styled from "styled-components";


export const MainContainer = styled("div")`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Button = styled.button`
  cursor: pointer;
  background: linear-gradient(45deg, #ffc75d, #ffc708);
  box-shadow: 0 0 24px #ffb20861;
  border: 2px solid #ffe825;
  border-radius: 100px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    text-shadow 0.3s ease;
  padding: 10px 20px;
  color: #09090b;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Ombre du texte */

  &:hover {
    background-color: #ffc75d !important;
    box-shadow: 0 0 34px #ffb20861 !important;
    text-shadow: 0 0 4px #ffe825; /* Ombre du texte au survol */
    border-color: #ffe825 !important;
  }
`;

export const Icon = (styled.svg)`
  margin-right: 5px;
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3)); /* Ombre de l'icône */
`;


export const GridContainer = styled("div")`
  width: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
`;

export const TypographyTitle = styled(Typography)`
  width: 100%;
  display: flex;
  align-items: start;
  padding-left: 4.5rem;
`;

export const TypographyDate = styled(Typography)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;

export const TypographyNumero = styled(Typography)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;
export const TypographyArticles = styled(Typography)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;

