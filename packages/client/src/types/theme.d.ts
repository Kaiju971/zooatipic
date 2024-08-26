// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTheme } from "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    colorJauneFooter: Palette["primary"];
    colorJauneFonce: Palette["primary"];
    colorOrangeMenu: Palette["primary"];
    colorRougeOpacity: Palette["primary"];
    colorGris: Palette["primary"];
    colorBackgroundForm: Palette["primary"];
    colorBackgroundForm1: Palette["primary"];
    colorVertMenu: Palette["primary"];
    colorJauneTexte: Palette["primary"];
    colorVertButton: Palette["primary"];
    colorJauneBorder: Palette["primary"];
  }

  interface PaletteOptions {
    colorJauneFooter?: PaletteOptions["primary"];
    colorJauneFonce?: PaletteOptions["primary"];
    colorOrangeMenu?: PaletteOptions["primary"];
    colorRougeOpacity?: PaletteOptions["primary"];
    colorGris?: PaletteOptions["primary"];
    colorBackgroundForm?: PaletteOptions["primary"];
    colorBackgroundForm1?: PaletteOptions["primary"];
    colorVertMenu?: PaletteOptions["primary"];
    colorJauneTexte?: PaletteOptions["primary"];
    colorVertButton?: PaletteOptions["primary"];
    colorJauneBorder?: PaletteOptions["primary"];
  }
}
