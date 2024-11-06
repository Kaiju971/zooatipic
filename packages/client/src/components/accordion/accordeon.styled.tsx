import styled from "styled-components";

export const MainContainer = styled("div")`

  width: 100%;
  height: 30vh;
 
`;

export const Box = styled("div")`
  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
  width: 100vw;
  height: 30vh;
`;


export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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

export const Icon = styled.svg`
  margin-right: 5px;
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3)); /* Ombre de l'icône */
`;

export const BoxContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  text-align: center;
  width: 60vw;
  padding-top: 1rem;
`;



