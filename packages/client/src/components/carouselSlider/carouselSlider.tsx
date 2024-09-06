import React from "react";
import Slider from "react-slick";
import { CarouselImg } from "../../types/produits";

import * as S from "./carouselSlider.styled";
import { Typography } from "@mui/material";

type ImagesCarousel = {
  imagesArray: CarouselImg[] | undefined;
};

const CarouselSlider: React.FC<ImagesCarousel> = ({ imagesArray }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
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
        {imagesArray?.map((item, index) => (
          <S.ImgContainer key={index}>
            <S.FlexContainer>
              <img src={item.src} alt={item.alt} width="30%" height="30%" />
              <Typography variant="body1" alignItems="center">
                {item.alt}
              </Typography>
            </S.FlexContainer>
          </S.ImgContainer>
        ))}
      </Slider>
    </S.MainContainer>
  );
};

export default CarouselSlider;
