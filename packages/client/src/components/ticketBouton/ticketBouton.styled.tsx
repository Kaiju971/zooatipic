import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)`
  position: relative;
  padding: 1rem 4rem; /* Pour ajuster les dimensions du bouton */
  background-color: black;
  color: white;
  border: 4px solid;
  border-top-color: #382004;
  border-inline-color: #ca7d23;
  border-bottom-color: #fcaa30;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;

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
    background: linear-gradient(
      to bottom,
      #fcaa30 0%,
      /* Couleur en haut */ #ca7d23 50%,
      /* Couleur des côtés */ #382004 100% /* Couleur en bas */
    );
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
    cursor:not-allowed;
  }
`;
