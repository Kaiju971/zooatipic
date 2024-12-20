import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";
import * as S from "./avis.styled";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AvisShowType } from "../../types/avis";
import { getAvis } from "../../api/fetchers/avis";
import LongText from "../../utils/lirePlus";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "red",
        marginRight: "2rem",
        zIndex: "10",
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        marginLeft: "2rem",
        zIndex: "10",
      }}
      onClick={onClick}
    />
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 1500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: true,
  cssEase: "linear",
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

interface AvisData {
  results: AvisShowType[];
}

const AvisShow: React.FC = () => {
  const {
    data: avisdata,
    isLoading,
    isError,
  } = useQuery<AvisData>({
    queryKey: ["getavis"],
    queryFn: () => getAvis(),
  });

  if (isError) return <p>Error loading products</p>;

  return (
    <S.MainContainer>
      <Typography
        variant="h2"
        color="white"
        display="flex"
        justifyContent="center"
      >
        AVIS CLIENTS
      </Typography>
      <Slider {...settings}>
        {avisdata?.results?.flat().map((item, index) => (
          <S.Box key={index}>
            <Typography
              variant="h5"
              color="white"
              display="flex"
              justifyContent="center"
              sx={{ mt: 0 }}
            >
              {item.sujet}
            </Typography>

            <LongText
              textExpanded={item.message}
              variantTypography={"body1"}
              loading={isLoading}
            />

            <Rating
              disabled
              size="large"
              value={item.note || 0}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Typography
              variant="h5"
              color="white"
              display="flex"
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              {item.prenom}
            </Typography>
          </S.Box>
        ))}
      </Slider>
    </S.MainContainer>
  );
};

export default AvisShow;
