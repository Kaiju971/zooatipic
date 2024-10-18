// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";

// export const StyledButton = styled(Button)`
//   background-color: ${({ theme }) => theme.palette.buttonNoir.main};
//   padding-right: 4rem;
//   padding-left: 4rem;
//   padding-top: 1rem;
//   padding-bottom: 1rem;
//   box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2); /* Effet d'ombre au clic */
//   border: 2px solid transparent; /* Bordure transparente de base */
//   border-radius: 5px; /* Arrondir les angles */
//   transition: background-color 0.3s ease, border-color 0.3s ease; /* Animation de transition */

//   /* Garde le bouton visible au survol */
//   &:hover {
//     background-color: ${({ theme }) =>
//       theme.palette.buttonNoir.main}; /* Couleur de fond au hover */
//     border-color: ${({ theme }) =>
//       theme.palette.secondary.main}; /* Bordure colorée au hover */
//     color: ${({ theme }) =>
//       theme.palette.primary.main}; /* Couleur du texte au hover */
//   }

//   &:active {
//     box-shadow: 0 14px 8px rgba(0, 0, 0, 0.2); /* Effet d'ombre au clic */
//   }

//   /* Pour gérer l'état désactivé */
//   &:disabled {
//     background-color: ${({ theme }) => theme.palette.grey[400]};
//     color: ${({ theme }) => theme.palette.text.disabled};
//     cursor: not-allowed;
//   }
// `;

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)<{ mode: string }>`
  position: relative;
  padding: 0rem 2rem; /* Pour ajuster les dimensions du bouton */
  background-color: black;
  color: white;
  border: ${(props) => (props.mode === "ticket" ? "4px solid" : "none")};
  border-radius: 10px;
  border-top-color: ${(props) =>
    props.mode === "ticket" ? "#382004" : "none"};
  border-inline-color: ${(props) =>
    props.mode === "ticket" ? "#ca7d23" : "none"};
  border-bottom-color: ${(props) =>
    props.mode === "ticket" ? "#fcaa30" : "none"};
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-transform: none;

  /* Pseudo-élément pour la bordure en gradient */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: black;
    z-index: -1;
    border-radius: 5px; /* Pour arrondir les coins si besoin */
  }

  &:hover::before {
    /* Optionnel : Modification du gradient au survol */
    background: ${(props) =>
      props.mode === "ticket"
        ? "linear-gradient(to bottom, #fcaa30 0%, #ca7d23 50%, #382004 100%)"
        : "none"};
  }

  /* Garde le bouton visible au survol */
  &:hover {
    background-color: ${({ theme, mode }) =>
      mode === "ticket" ? "none" : theme.palette.buttonNoir.main};
    border-color: ${({ theme, mode }) =>
      mode === "ticket" ? "none" : theme.palette.secondary.main};
  }

  &:active::before {
    /* Optionnel : Changement au clic */
    border-top-color: #382004;
    border-inline-color: #ca7d23;
    border-bottom-color: #fcaa30;
    box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.grey[400]};
    color: ${({ theme }) => theme.palette.text.disabled};
    cursor: not-allowed;
  }
`;
