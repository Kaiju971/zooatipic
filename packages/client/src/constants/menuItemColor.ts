import { MenuItems } from "./menuItems";

type ItemsMap = {
  [key in MenuItems]: { text: string; color: string };
};

export const menuItemColor: ItemsMap = {
  [MenuItems.ACCUEIL]: { text: "ACCUEIL", color: "colorOrangeMenu.main" },
  [MenuItems.NOTREPARC]: { text: "NOTRE PARC", color: "colorVertMenu.main" },
  [MenuItems.NOSRESIDENTS]: { text: "NOS RESIDENTS", color: "colorMarronMenu.main" },
};
