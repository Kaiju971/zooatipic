import { keyframes } from "@emotion/react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { styled as muiStyled } from "@mui/system";

export const MainContainer = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black; /* Black background with some transparency */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

// Styled component for the rotating image
export const RotatingImage = styled("img")`
  animation: rotation 2s infinite linear; /* Rotation animation */
  width: 150px;
  height: auto;

  @keyframes rotation {
    from {
      transform: rotate(0deg); /* Start rotation from 0 degrees */
    }
    to {
      transform: rotate(360deg); /* End rotation at 360 degrees */
    }
  }
`;

export const MainContainer2 = styled("div")`
  display: block;
  width: 100%;
  height: 100vh;
  justify-content: center;
  background-color: white;
  align-items: center;
  text-align: center;

  @media (max-width: 750px) {
    display: grid;
    grid-template-columns: 1fr;
    margin-left: 0%;
    margin-right: 0%;
  }
`;

export const pTag = styled("p")`
  width: 50%;
  height: auto;
  justify-content: center;
  text-align: center;
  margin-left: 25%;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const pLogo = styled("p")`
  font-size: 10rem;
  font-weight: 900;
  justify-content: center;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, darkred, gray, black);
  -webkit-background-clip: text;
  color: transparent;
`;

export const BoxForm = styled("div")`
  padding-top: 4vh;
  padding-bottom: 4vh;
  height: 90vh;
`;

export const BoxForm2 = styled("div")`
  padding-top: 4vh;
  padding-bottom: 4vh;
  height: auto;
  margin-top: 7rem;
  @media (max-width: 750px) {
    width: 100%;
    height: 50%;
    margin-top: 2rem;
  }
`;

export const ContainerEmail = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 762px) {
    width: 91.5%;
    margin-left: 3%;
  }
  @media (max-width: 530px) {
    width: 90%;
  }
`;

export const Containerlogo = styled("div")`
  display: block;
  justify-content: center;
  width: 32%;
  top: 0;
  height: 10vh;
  margin-left: 37.5%;
  background-color: white;
  border-radius: 5px;
`;

export const Containergif = styled("div")`
  display: block;
  justify-content: center;
  width: 50%;
  margin-top: 6rem;
  height: 20vh;
  margin-left: 25%;
  background-color: black;
  border-radius: 5px;
`;

export const ContainerImage = styled("img")`
  justify-content: center;
  width: 20%;
  margin-left: 40%;
  margin-top: 35%;
  bottom: 0;
`;

export const ContainerImage2 = styled("img")`
  justify-content: center;
  width: 20%;
  margin-left: 40%;
  padding: 1rem 0;
`;

export const ButtonSubmit = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  margin-bottom: 1.5rem;

  @media (max-width: 750px) {
  }
`;
const bounce = keyframes`
  0% {
    background-color: red;
    transform: translateX(0) translateY(60px);
  }
  25% {
    background-color: blue;
    transform: translateX(60px) translateY(0);
  }
  55% {
    background-color: green;
    transform: translateX(0) translateY(-60px);
  }
  75% {
    background-color: yellow;
    transform: translateX(-60px) translateY(0);
  }
  100% {
    background-color: purple;
    transform: translateX(0) translateY(60px);
  }
`;

const divColorChange = keyframes`
  0% {
    color: red;
  }
  25% {
    color: blue;
  }
  55% {
    color: green;
  }
  75% {
    color: yellow;
  }
  100% {
    color: purple;
  }
`;

export const LoaderContainer = styled("div")`
  width: 150px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  animation: ${bounce} 5s infinite;
`;

export const LoaderBefore = styled("div")`
  content: "DVD";
  position: absolute;
  display: block;
  left: 5%;
  bottom: 55%;
  color: green;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 4em;
  font-weight: 900;
  font-style: italic;
  animation: ${divColorChange} 5s infinite;
`;

export const LoaderAfter = muiStyled("div")`
  content: 'FWDJC';
  position: absolute;
  top: 30%;
  left: 21%;
  color: #212121;
  font-size: .5em;
  font-weight: 800;
  letter-spacing: 10px;
  z-index: 1;
`;
