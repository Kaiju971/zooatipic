// import { Paper } from "@mui/material";
// import { styled } from "@mui/material/styles";

// export const MainContainer = styled("div")`
//   color: ${({ theme }) => theme.palette.secondary.main};
//   background-color: #fcdb30;
//   text-align: end;
//   * {
//     margin: 0;
//     padding: 0;
//   }

//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// export const Item = styled(Paper)(({ theme }) => ({
//   color: theme.palette.primary.main,
//   // backgroundColor: theme.palette.colorNoir.main,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   // wordBreak: "break-all",
//   // fontSize: "1rem",
//   // fontWeight: "700",
//   marginTop: "2vh",

//   [theme.breakpoints.down("lg")]: {
//     fontSize: "0.8rem",
//   },

//   [theme.breakpoints.down("md")]: {
//     fontSize: "0.6rem",
//   },

//   [theme.breakpoints.down("sm")]: {
//     fontSize: "0.4rem",
//   },

//   [theme.breakpoints.down("xs")]: {
//     fontSize: "0.3rem",
//   },
// }));

// export const ImgContainer = styled("div")`
//   width: 10vw;
//   height: 14vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// export const Robot = styled("img")`
//   width: 10vw;
//   height: 20vh;
// `;

// export const TextContainer = styled("div")`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  color: ${({ theme }) => theme.palette.secondary.main};
  background-color: #fcdb30;
  text-align: end;
  * {
    margin: 0;
    padding: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Item = styled(Paper)(({ theme }) => ({
  color: theme.palette.primary.main,
  // backgroundColor: theme.palette.colorNoir.main,
  padding: theme.spacing(1),
  textAlign: "center",
  // wordBreak: "break-all",
  // fontSize: "1rem",
  // fontWeight: "700",
  marginTop: "2vh",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
  },

  [theme.breakpoints.down("xs")]: {
    fontSize: "0.3rem",
  },
}));

export const ImgContainer = styled("div")`
  width: 10vw;
  height: 14vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Robot = styled("img")`
  width: 10vw;
  height: 20vh;
`;

export const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
