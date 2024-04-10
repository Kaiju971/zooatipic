import Topbar from "../topbar/topbar";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Footer from "../footer/footer";
import { AppRoutes } from "./appRoutes";
import ScrollButton from "../components/scrollButton";
//  import FaviconTheme from "../shared/faviconTheme";
import React from "react";

export let theme = createTheme({
  palette: {
    primary: {
      main: "#a90b0b",
    },
    secondary: {
      main: "#ffffff",
    },
    colorNoir: {
      main: "#000000",
    },
    colorVert: {
      main: "#23FC00",
    },
    colorTexteVert: {
      main: "#06483a",
    },
    colorRougeOpacity: {
      main: "#9c050593",
    },
    colorGris: {
      main: "#d9d9d96e",
    },
    colorBackgroundForm1: {
      main: "#00000027",
    },
    colorBackgroundForm: {
      main: "#d0d0d0f3",
    },
    rougeFoncé: {
      main: "#3e1313", // #ccf5d5 //
    },
    colorJaune: {
      main: "#f9f905", //#8B9781 //#0B3E27
    },
  },
  typography: {
    h1: {
      fontFamily: "Times New Roman, serif",
    },
    h2: {
      fontFamily: "Gelasio, serif",
      fontSize: "2rem",
      "@media (max-width:1600px)": {
        fontSize: "1.8rem",
      },
    },
    h3: {
      fontFamily: "Special Elite, cursive",
      "@media (max-width:750px)": {
        fontSize: "1rem",
      },
    },
    h4: {
      fontFamily: "Times New Roman, serif",
      "@media (max-width:750px)": {
        fontSize: "0.7rem",
      },
    },
    h5: {
      fontFamily: "Architects Daughter, serif",
      fontSize: "1.6rem",
      "@media (max-width:1200px)": {
        fontSize: "1rem",
      },
    },
    h6: {
      fontFamily: "Great Vibes, cursive",
    },
    body1: {
      fontFamily: "Special Elite, sans-serif",
      "@media (max-width:1600px)": {
        fontSize: "0.8rem",
      },
      "@media (max-width:1200px)": {
        fontSize: "0.7rem",
      },
      "@media (max-width:900px)": {
        fontSize: "0.6rem",
      },
      "@media (max-width:500px)": {
        fontSize: "0.5rem",
      },
      "@media (max-width:370px)": {
        fontSize: "0.4rem",
      },
    },
    body2: {
      fontFamily: "Times New Roman, serif",
    },
    subtitle1: {
      fontFamily: "Times New Roman, serif",
      fontSize: "10rem",
      "@media (max-width:750px)": {
        fontSize: "3rem",
      },
      "@media (max-width:350px)": {
        fontSize: "2rem",
      },
    },
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { xs: 0, sm: 568, md: 760, lg: 960, xl: 1200 },
  },
});
theme = responsiveFontSizes(theme);

const App: React.FC = () => (
  <ThemeProvider theme={responsiveFontSizes(theme)}>
    {/* <FaviconTheme /> */}
    <Topbar />
    <SnackbarProvider>
      <AppRoutes />
      <ScrollButton />
    </SnackbarProvider>
    <Footer />
  </ThemeProvider>
);

export default App;
