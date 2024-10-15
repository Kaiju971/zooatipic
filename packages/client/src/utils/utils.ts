export const hexToRgba = (hex: string, alpha: number) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const splitLineAtParenthesis = (text: string) => {
  // Divise le texte en deux parties à partir de "("
  const parts = text.split("(");

  // Si la ligne contient le caractère "(", ajoute "(" à la deuxième partie
  if (parts.length > 1) {
    parts[1] = "(" + parts[1];
  }

  return parts;
};
