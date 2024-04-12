import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  color: black;
  display: block;
  margin-top: 10rem;
  margin-bottom: 5rem;
  @media (max-width: 390px) {
    width: 100%;
    height: auto;
    margin-top: 4.5rem;
    height: auto;
    box-sizing: border-box;
  }
`;

export const Container = styled("div")`
  display: flex;
  width: 70%;
  margin-left: 15%;
  height: 40vh;
  margin-top: 1rem;
  justify-content: space-between;
  @media (max-width: 390px) {
    display: block;
    width: 100%;
    margin-left: 0;
  }
`;

export const BannerContainer = styled("div")<{ imageUrl: string }>`
  position: relative;
  width: 49%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  box-shadow: 10px 10px 12px rgba(0, 0, 0, 0.2);
  @media (max-width: 390px) {
    width: 100%;
    display: block;
    box-shadow: none;
  }
`;