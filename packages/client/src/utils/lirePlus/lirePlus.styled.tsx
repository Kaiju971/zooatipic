import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 80% 20%;
  margin-bottom: 4vh;
`;

export const TextContainer = styled("div")`
  grid-row: 1;
  width: 80%; /* Largeur fixe */
  display: -webkit-box; /* Pour activer line-clamp */
  -webkit-line-clamp: 2; /* Nombre de lignes max */
  -webkit-box-orient: vertical; /* Orientation de la boîte */
  overflow: hidden; /* Masquer le texte débordant */
  text-overflow: ellipsis; /* Ajouter ... à la fin */
  height: 4vh;
  text-align: center;
  justify-self: center;
`;

export const FullText = styled("div")`
  grid-row: 2;
  /*width: 300px; /* Largeur identique */
  white-space: normal; /* Autorise les sauts de ligne */
  overflow: visible; /* Affiche tout */
`;

export const VoirPlus = styled("span")`
  color: blue;
  cursor: pointer;
  font-weight: bold;
  margin-left: 5px;
  height: 1vh;
  padding-top: 1vh;
  &:hover {
    text-decoration: underline;
  }
`;
