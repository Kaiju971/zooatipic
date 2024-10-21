/////basket//////

import { CommandesHead } from "../types/commandes";
import { Basket } from "../types/panier";

function saveBasket(basket: Basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

export const getBasket = () => {
  let basket = localStorage.getItem("basket");

  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
};

export const addBasket = (product: Basket) => {
  let basket = getBasket();

  let foundProduct;
  if (Object.keys(basket).length) {
    foundProduct = basket.find(
      (p: Basket) => p.id_article === product.id_article
    );
  }
  if (foundProduct !== undefined) {
    foundProduct.quantite++;
  } else {
    product.quantite = 1;
    basket.push(product);
  }
  saveBasket(basket);
};

const removeFromBasket = (product: Basket) => {
  let basket = getBasket();
  basket = basket.filter((p: Basket) => p.id_article !== product.id_article);
  saveBasket(basket);
};

export const changeQuantity = (id_product: number, quantity: number) => {
  let basket = getBasket();
  let foundProduct = basket.find((p: Basket) => p.id_article === id_product);
  if (foundProduct !== undefined) {
    foundProduct.quantite = quantity;

    if (foundProduct.quantite <= 0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }
};

export const addPropertyToBasket = (
  id_product: number,
  property: string,
  value: string
) => {
  let basket = getBasket();
  let foundProduct = basket.find((p: Basket) => p.id_article === id_product);
  if (foundProduct !== undefined) {
    foundProduct[property] = value;
    saveBasket(basket);
  }
};

export const getNumberProducts = () => {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantite;
  }
  return number;
};

export const getTotalSum = () => {
  let basket = getBasket();
  let total = 0;
  for (let product of basket) {
    total += product.quantite * product.prix;
  }
  return total;
};

export const emptyBasket = () => {
  localStorage.clear();
};

/////commandeHead//////

export function saveCommandeHead(commandeHead: CommandesHead) {
  localStorage.setItem("commandeHead", JSON.stringify(commandeHead));
}

export const getCommandeHead = () => {
  let commandeHead = localStorage.getItem("commandeHead");

  if (commandeHead == null) {
    return [];
  } else {
    return JSON.parse(commandeHead);
  }
};
