import Beaggle from "../../images/Beaggle.jpg";
import birdFood from "../../images/birdFood.jpg";
import catFood from "../../images/catFood.jpg";
import DevonRex from "../../images/DevonRex.jpg";
import dogFood from "../../images/dogFood.jpg";
import livraison from "../../images//livraison.jpg";
import a_emporter from "../../images/a_emporter.jpg";
import sur_place from "../../images/nourritureParc.jpg";



type ImgCarousel = {
  src: string;
  alt: string;
};


type ImgCarouselV = {
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


export const ArrayConfig2: ImgCarouselV[] = [
  {
    src: livraison,
    alt: "faites livrer le plat de votre choix à votre animal de compagnie",
  },
  {
    src: a_emporter,
    alt: "Emportez le plat que vous avec confectionné dans notre laboratoire pour votre animal",
  },
  {
    src: sur_place,
    alt: "vous pouvez donner le repas aux animaux du parc zoologique",
  },
];