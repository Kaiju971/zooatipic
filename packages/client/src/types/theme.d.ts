// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTheme } from "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    colorMarronMenu: Palette["primary"];
    colorVertMenu: Palette["primary"];
    colorOrangeMenu: Palette["primary"];
    colorRougeOpacity: Palette["primary"];
    colorGris: Palette["primary"];
    colorBackgroundForm: Palette["primary"];
    colorBackgroundForm1: Palette["primary"];
    rougeFoncé: Palette["primary"];
    colorJaune: Palette["primary"];
  }

  interface PaletteOptions {
    colorMarronMenu?: PaletteOptions["primary"];
    colorVertMenu?: PaletteOptions["primary"];
    colorOrangeMenu?: PaletteOptions["primary"];
    colorRougeOpacity?: PaletteOptions["primary"];
    colorGris?: PaletteOptions["primary"];
    colorBackgroundForm?: PaletteOptions["primary"];
    colorBackgroundForm1?: PaletteOptions["primary"];
    rougeFoncé?: PaletteOptions["primary"];
    colorJaune?: PaletteOptions["primary"];
  }
}
