declare global {
  interface Window {
    paypal?: any; // Déclare paypal comme 'any' pour contourner l'absence de type exact
  }
}
export {};
