import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.buttonNoir.main};
  padding-right: 4rem;
  padding-left: 4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2); /* Effet d'ombre au clic */
  border: 2px solid transparent; /* Bordure transparente de base */
  border-radius: 5px; /* Arrondir les angles */
  transition: background-color 0.3s ease, border-color 0.3s ease; /* Animation de transition */

  /* Garde le bouton visible au survol */
  &:hover {
    background-color: ${({ theme }) =>
      theme.palette.buttonNoir.main}; /* Couleur de fond au hover */
    border-color: ${({ theme }) =>
      theme.palette.secondary.main}; /* Bordure colorée au hover */
    color: ${({ theme }) =>
      theme.palette.primary.main}; /* Couleur du texte au hover */
  }

  &:active {
    box-shadow: 0 14px 8px rgba(0, 0, 0, 0.2); /* Effet d'ombre au clic */
  }

  /* Pour gérer l'état désactivé */
  &:disabled {
    background-color: ${({ theme }) => theme.palette.grey[400]};
    color: ${({ theme }) => theme.palette.text.disabled};
    cursor: not-allowed;
  }
`;
