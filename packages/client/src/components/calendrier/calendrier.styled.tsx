
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



  &:active::before {
    /* Optionnel : Changement au clic */
    border-top-color: #382004;
    border-inline-color: #ca7d23;
    border-bottom-color: #fcaa30;
    box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2);
  }

`;
