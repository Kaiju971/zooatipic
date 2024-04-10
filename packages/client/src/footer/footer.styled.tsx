import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  color: ${({ theme }) => theme.palette.secondary.main};

  text-align: center;
  * {
    margin: 0;
    padding: 0;
  }
`;

export const Item = styled(Paper)(({ theme }) => ({
  color: theme.palette.primary.main,
  // backgroundColor: theme.palette.colorNoir.main,
  padding: theme.spacing(1),
  textAlign: "center",
  wordBreak: "break-all",
  fontSize: "1rem",
  fontWeight: "700",
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

export const TextContainer = styled("div")`
  color: ${({ theme }) => theme.palette.secondary.main};

  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  justify-items: start;

  @media (max-width: 750px) {
    justify-items: center;
  }
`;

export const ImgContainer = styled("div")`
  margin-top: 2vh;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  width: 15vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: solid;
  border-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: rgba(249, 2, 2, 0.4) 0px 2px 4px,
    rgba(249, 2, 2, 0.3) 0px 7px 13px -3px,
    rgba(249, 2, 2, 0.2) 0px -3px 0px inset;

  @media (max-width: 1200px) {
    height: 16vh;
  }
  @media (max-width: 900px) {
    height: 14vh;
  }
  @media (max-width: 750px) {
    height: 12vh;
  }
  @media (max-width: 568px) {
    height: 8vh;
  }
  @media (max-width: 450px) {
    height: 6vh;
  }
  @media (max-width: 350px) {
    height: 4vh;
  }
`;

export const TestSup = styled("span")`
  vertical-align: super;
  font-size: 0.7rem;
  border: solid 0.1px red;
  border-radius: 50%;
  padding-top: 3px;
  padding-left: 4px;
  padding-right: 4px;
  line-height: 1.5em;
  margin-left: 4px;

  @media (max-width: 750px) {
    font-size: 0.4rem;
    padding-left: 2px;
    padding-right: 2px;
  }
`;
