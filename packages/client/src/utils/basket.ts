/////basket//////

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
    foundProduct.quantité++;
  } else {
    product.quantité = 1;
    basket.push(product);
  }
  saveBasket(basket);
};

const removeFromBasket = (product: Basket) => {
  let basket = getBasket();
  basket = basket.filter((p: Basket) => p.id_article !== product.id_article);
  saveBasket(basket);
};

export const changeQuantity = (product: Basket, quantity: number) => {
  let basket = getBasket();
  let foundProduct = basket.find(
    (p: Basket) => p.id_article === product.id_article
  );
  if (foundProduct !== undefined) {
    foundProduct.quantity += quantity;

    if (foundProduct.quantity <= 0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }
};

export const getNumberProduct = () => {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number += product.quantity;
  }
  return number;
};

export const getTotalPrice = () => {
  let basket = getBasket();
  let total = 0;
  for (let product of basket) {
    total += product.quantity * product.price;
  }
  return total;
};

export const emptyBasket = () => {
  localStorage.clear();
};
