import { Box, ButtonBase, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Card)`
  background: linear-gradient(
    180deg,
    rgb(250, 249, 249) 1%,
    rgba(55, 2, 2, 0.634) 100%
  );
  box-shadow: 14px 14px 14px black;
  width: 20vw;
  height: 30vh;

  @media (max-width: 1500px) {
    width: 25vw;
  }

  @media (max-width: 1200px) {
    width: 40vw;
  }

  @media (max-width: 750px) {
    width: 80vw;
  }

  @media (max-width: 400px) {
    width: 60vw;
  }
`;

export const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "98%",
  width: "99%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,

    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiBox-root": {
      border: "4px solid currentColor",
    },
  },
}));

export const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

export const Image = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

export const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

export const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export const FlexContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
