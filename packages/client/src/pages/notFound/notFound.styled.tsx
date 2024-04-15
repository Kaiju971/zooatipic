import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import image404 from "../../images/ZOOAtipic.png";

export const MainContainer = styled("div")`
  color: darkred;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  padding: 0;
  justify-content: center;
  text-align: center;
`;

export const CenterContainer = styled("div")`
  color: darkred;
  width: 90%;
  margin-left: 5%;
  padding: 5rem 4rem;
  margin-top: 2.5rem;
  margin-bottom: 3rem;
  color: white;
  background: url(${image404});
  background-size: cover;
  background-position: center;
  box-shadow: 10px 10px 12px rgba(0, 0, 0, 0.2);
  height: auto;
  border-radius: 3px;

  @media (max-width: 850px) {
    height: auto;
    margin-bottom: 3rem;
    padding: 3rem 1.5rem;
  }
`;

export const FlexContainer = styled("div")`
  color: black;
  width: 90%;
  margin-left: 5%;
  padding: 1rem;
  height: auto;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 850px) {
    display: block;
    margin-bottom: 2rem;
    box-sizing: border-box;
    width: 100%;
    margin-left: 0;
  }
`;

export const InerBoxContainer = styled("div")`
  width: 40%;
  background: darkred;
  box-shadow: 10px 10px 12px rgba(0, 0, 0, 0.2);
  display: block;
  padding: 1rem;
  justify-content: center;
  text-align: center;

  @media (max-width: 850px) {
    width: 100%;
    height: auto;
    box-sizing: border-box;
  }
`;

export const RouteContainer = styled("div")`
  padding: 1rem;
  width: 100%;
  justify-content: center;
  text-align: center;
`;

export const Lien = styled("a")`
  color: black;
  text-decoration: none;
  display: block;
  cursor: pointer;
  margin: 0.4rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledAppBar = styled(AppBar)`
  background-color: #333; // Change to your desired color
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  height: 20vh;
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: 20px;
`;

export const StyledTypography = styled(Typography)`
  margin: 20px 0;
  font-weight: 900;
  color: white;

  @media (max-width: 850px) {
    margin: 0;
    font-size: 0.7rem;
  }
`;

export const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 10px;
  }

  .slick-prev,
  .slick-next {
    color: #fff; // Change to your desired color
  }

  @media (max-width: 850px) {
    display: none;
  }
`;

export const StyledSliderItem = styled("div")`
  background-color: #eee; // Change to your desired color
  padding: 20px;
  border-radius: 5px;
`;

export const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export const StyledMenuIcon = styled(MenuIcon)`
  color: #fff; // Change to your desired color
`;

export const StyledMenu = styled(Menu)``;

export const StyledMenuItem = styled(MenuItem)``;
