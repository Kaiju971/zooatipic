import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import * as S from "./avis.styled";
import { Typography } from "@mui/material";

interface Label {
  [index: string]: string;
}

const labels: Label = {
  0.5: "Je déconseille",
  1: "Je déconseille+",
  1.5: "Mauvais",
  2: "Mauvais+",
  2.5: "Moyen",
  3: "Moyen+",
  3.5: "Bien",
  4: "Bien+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

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

const ArrayConfig = [1, 2, 3, 4, 5];

const Avis: React.FC = () => {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

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
        {ArrayConfig.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "3rem",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              color="white"
              display="flex"
              justifyContent="center"
              sx={{ mt: 0 }}
            >
              Avis des clients
            </Typography>
            <Rating
              name={`hover-feedback-${index}`}
              size="large"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ mt: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        ))}
      </Slider>
    </S.MainContainer>
  );
};

export default Avis;
