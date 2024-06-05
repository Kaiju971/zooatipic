import Beaggle from "../../images/Beaggle.jpg";
import birdFood from "../../images/birdFood.jpg";
import catFood from "../../images/catFood.jpg";
import DevonRex from "../../images/DevonRex.jpg";
import dogFood from "../../images/dogFood.jpg";
type ImgCarousel = {
  src: string;
  alt: string;
};

export const ArrayConfig: ImgCarousel[] = [
  {
    src: Beaggle,
    alt: "Beaggle",
  },
  {
    src: birdFood,
    alt: "birdFood",
  },
  {
    src: catFood,
    alt: "catFood",
  },
  {
    src: DevonRex,
    alt: "DevonRex",
  },

  {
    src: dogFood,
    alt: "dogFood",
  },
];
