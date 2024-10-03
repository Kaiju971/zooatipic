import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  width: 100%;
`;
export const VideoContainer = styled("div")`
  position: relative;
  width: 100%;
  padding-top: 56.25%;

  video {
    z-index: -1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    transform: translate(-50%, -50%); // centre video
    min-height: 100%;
  }
`;
export const GridBox = styled("div")`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  justify-items: center;
  align-items: center;
`;

export const CarouselContainer = styled("div")`
  grid-column: 1;
  grid-row: 1;
  color: white;
  width: 50vw;
  height: 100%;
  text-align: center;
`;

export const TextContainer = styled("div")`
  grid-column: 2;
  grid-row: 1;
  background-color: #9d6f16;
  color: white;
  width: 50vw;
  height: 100%;
  text-align: center;
  z-index: 10;
`;

export const Box = styled("div")`
  //   grid-column: 1;
  //   grid-row: 2;
  //   background-color: #9d6f16;
  //   display: flex;
  //   justify-content: center;
  //   text-align: center;
  //   width: 50vw;
  //   height: 100%;
`;

export const NewsLetter = styled("div")`
  grid-column: 1;
  grid-row: 2;
  background-color: #9d6f16;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100%;
`;

export const ImgContainer = styled("div")`
  grid-column: 2;
  grid-row: 2;
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Img = styled("img")`
  width: 100%;
  height: 100%;
`;


