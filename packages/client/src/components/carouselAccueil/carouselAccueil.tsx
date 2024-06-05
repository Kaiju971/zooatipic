import React from "react";
import Slider from "react-slick";
import { ArrayConfig } from "./config";

import * as S from "./carouselAccueil.styled";

const CarouselAccueil: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <S.MainContainer>
      <Slider {...settings}>
        {ArrayConfig.map((item, index) => (
          <S.ImgContainer key={index}>
            <img src={item.src} alt={item.alt} width="100%" height="100%" />
          </S.ImgContainer>
        ))}
      </Slider>
    </S.MainContainer>
  );
};

export default CarouselAccueil;
