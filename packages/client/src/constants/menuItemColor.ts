import { MenuItems } from "./menuItems";

type ItemsMap = {
  [key in MenuItems]: { text: string; color: string };
};

export const menuItemColor: ItemsMap = {
  [MenuItems.ACCUEIL]: { text: "Accueil", color: "colorOrangeMenu.main" },
  [MenuItems.APROPOS]: { text: "A propos", color: "colorVertMenu.main" },
  [MenuItems.PRODUITS]: { text: "Produits", color: "colorMarronMenu.main" },
};
