import { styled } from "@mui/material/styles";
import panier from "../../images/bg_panier.webp";
import { Typography } from "@mui/material";

export const MainContainer = styled("div")`
  height: 100vh;
  width: 100%;
  z-index: 1;

  & ::before {
    content: "";
    background-image: url(${panier});
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  @media (max-width: 750px) {
    display: block;
  }
`;

export const Page = styled(Typography)`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled("div")`
  width: 100vw;
  height: 100vh;

  @media (max-width: 750px) {
    display: block;
  }
`;
