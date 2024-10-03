import React from "react";
import Slider from "react-slick";
import { ArrayConfig2 } from "./config";

import * as S from "./carouselVerticalVente.styled";

const CarouselVerticalVente: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    arrows: false,
    beforeChange: function (currentSlide: any, nextSlide: any) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide: any) {
      console.log("after change", currentSlide);
    },
  };
  return (
    <S.MainContainer>
      <Slider {...settings}>
        {ArrayConfig2.map((item, index) => (
          <S.ImgContainer key={index}>
            <S.FlexContainer>
              <S.Image src={item.src} alt={item.alt} indexCouleurs={index} />
              <S.StyledTypography variant="h6" indexCouleurs={index}>
                {item.alt}
              </S.StyledTypography>
            </S.FlexContainer>
          </S.ImgContainer>
        ))}
      </Slider>
    </S.MainContainer>
  );
};

export default CarouselVerticalVente;
