import { useCallback, useContext, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  ListItemButton,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import CottageIcon from "@mui/icons-material/Cottage";
import CallIcon from "@mui/icons-material/Call";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Devis from "@mui/icons-material/LibraryBooks";
import Façonnage from "@mui/icons-material/Engineering";
import { useLocation, useNavigate } from "react-router";
import { Routes } from "../../app/routes";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItems } from "../../constants/menuItems";
import { UserRoles } from "../../constants/roles";
import AuthContext from "../../store/auth/AuthContextProvider";
import Logo from "../../images/LOGOABS-COUVERTURE.OFF.png";
import { Helmet } from "react-helmet";

import * as S from "./topbar.styled";

const menuItemsArray = Object.values(MenuItems);

const TopBar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { globalLogOutDispatch, authState } = useContext(AuthContext);
  const isSelected = (item: string): boolean => pathname.includes(item);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleItemMenu = useCallback(
    (item: MenuItems) => {
      navigate(Routes[item as keyof typeof Routes]);
    },
    [navigate]
  );
  const drawer = (
    <S.DrawerBodyBox onClick={handleDrawerToggle}>
      <S.CloseIconStyle>
        <Typography variant="h5" className="close" color="primary.main">
          Close
        </Typography>
        <CloseIcon sx={{ fontSize: "2rem", color: "primary.main" }} />
      </S.CloseIconStyle>
      <S.LogoContainer>
        <S.LogoImage src={Logo} />
      </S.LogoContainer>
      <Divider variant="middle" sx={{ width: "80%" }} />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "100%",
        }}
      >
        {menuItemsArray.map((item) => (
          <ListItem key={item}>
            <ListItemButton
              selected={isSelected(item)}
              sx={{
                textTransform: "capitalize",
                textAlign: "left",
                display:
                  item === MenuItems.ADMIN &&
                  (!authState.isLoggedIn ||
                    authState.role === UserRoles.VISITEUR)
                    ? "none"
                    : "flex",
                "&.Mui-selected": {
                  color: "primary.main",
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  boxShadow: " rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
                  textShadow: "1px 1px white, -1px -1px black",
                },
                "&:hover": {
                  backgroundColor: "colorRougeOpacity",
                  borderRadius: "10px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                },
              }}
            >
              <ListItemIcon>
                {item === MenuItems.ACCUEIL && <CottageIcon color="primary" />}
                {item === MenuItems.PRODUITS && (
                  <ShoppingBasketIcon color="primary" />
                )}
                {item === MenuItems.CONTACT && <CallIcon color="primary" />}
                {item === MenuItems.APROPOS && (
                  <HomeRepairServiceIcon color="primary" />
                )}
                {item === MenuItems.DEVIS && <Devis color="primary" />}
                {item === MenuItems.FACONNAGE && <Façonnage color="primary" />}
              </ListItemIcon>
              <ListItemText
                primary={item === MenuItems.APROPOS ? "A propos de nous" : item}
                onClick={() => handleItemMenu(item)}
                primaryTypographyProps={{
                  fontSize: { xs: "4vw", sm: "4vw", md: "2vw" },
                  textTransform: "capitalize",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <S.LoginContainer>
        {authState.isLoggedIn ? (
          <Typography
            variant="h5"
            color="black"
            onClick={() => globalLogOutDispatch()}
          >
            Log Out
          </Typography>
        ) : (
          <Typography
            variant="h5"
            sx={{ opacity: 0 }}
            onClick={() => navigate(Routes.login)}
          >
            Log In
          </Typography>
        )}
      </S.LoginContainer>
      <Typography variant="body2" sx={{ color: "white", width: "100%" }}>
        © 2023 ABS COUVERTURE. Tous Droits Réservés.
      </Typography>
    </S.DrawerBodyBox>
  );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "transparent",
      }}
    >
      <Helmet>
        <title>ABS Couverture</title>
        <meta
          name="ABS Couverture"
          content="Entreprise générale de couverture"
        />
        <meta
          name="Logo - ABS Couverture"
          content="Entreprise générale de couverture"
        />
      </Helmet>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <S.FlexBox>
            <S.LogoMain src={Logo} onClick={() => navigate(Routes.accueil)} />
          </S.FlexBox>
          <div>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <S.DrawerBox
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </S.DrawerBox>
      </Box>
    </Box>
  );
};

export default TopBar;
