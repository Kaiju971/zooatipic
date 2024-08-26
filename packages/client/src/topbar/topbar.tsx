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
import Avatar from "@mui/material/Avatar";
import Basket from "../images/Basket.png";
import IconAvatar from "./iconAvatar";
import { useLocation, useNavigate } from "react-router";
import { Routes } from "../app/routes";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItems } from "../constants/menuItems";
import { menuItemColor } from "../constants/menuItemColor";
import AuthContext from "../store/auth/AuthContextProvider";
import Logo from "../images/ZOOAtipic.png";
import { Helmet } from "react-helmet";

import * as S from "./topbar.styled";

const getCurrentYear = (): number => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

const menuItemsArray = Object.values(MenuItems);

const TopBar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { globalLogOutDispatch, authState } = useContext(AuthContext);
  const isSelected = (item: string): boolean => pathname.includes(item);
  console.log(authState);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleItemMenu = useCallback(
    (item: MenuItems) => {
      navigate(Routes[item as keyof typeof Routes]);
    },
    [navigate]
  );

  const avatar = (
    <>
      <IconAvatar />
      <IconButton
        onClick={() => navigate(Routes.panier)}
        sx={{
          pl: 2,
        }}
      >
        <Avatar alt="Panier" src={Basket} />
      </IconButton>
    </>
  );

  const drawer = (
    <S.DrawerBodyBox>
      <S.CloseIconStyle onClick={handleDrawerToggle}>
        <Typography variant="h5" className="close" color="primary.main">
          Close
        </Typography>
        <CloseIcon sx={{ fontSize: "2rem", color: "primary.main" }} />
      </S.CloseIconStyle>
      <S.FlexCont mobile={true}>{avatar}</S.FlexCont>

      <Divider variant="middle" sx={{ width: "80%", mt: "2%" }} />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
        }}
      >
        {menuItemsArray.map((item) => (
          <ListItem key={item}>
            <ListItemButton selected={isSelected(item)}>
              <ListItemText
                primary={item === MenuItems.APROPOS ? "A propos" : item}
                onClick={() => handleItemMenu(item)}
                primaryTypographyProps={{
                  fontSize: { xxs: "3vh", xs: "4vh", sm: "4vh", md: "4vh" },
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
          <Typography variant="h5" onClick={() => navigate(Routes.login)}>
            Log In
          </Typography>
        )}
      </S.LoginContainer>
      <Typography
        variant="body2"
        sx={{
          color: "white",
          width: "100%",
          position: "absolute",
          bottom: "4%",
        }}
      >
        © {getCurrentYear()} ZooAtipic. Tous Droits Réservés.
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
        <title>ZooAtipic</title>
        <meta name="ZooAtipic" content="Zoo" />
        <meta name="Logo - ZooAtipic" content="Zoo" />
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
          <S.LogoMain src={Logo} onClick={() => navigate(Routes.accueil)} />

          <List
            sx={{
              justifyContent: "end",
              width: "100%",
              pl: 5,
              display: { xxs: "none", xs: "none", sm: "none", md: "flex" },
            }}
          >
            {menuItemsArray.map((item) => (
              <ListItem key={item}>
                <ListItemButton
                  selected={isSelected(item)}
                  sx={{
                    "&.Mui-selected": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                      borderRadius: "10px",
                    },
                    "&:hover": {
                      borderRadius: "10px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      item === MenuItems.APROPOS
                        ? "A propos"
                        : (menuItemColor[item].text as string)
                    }
                    onClick={() => handleItemMenu(item)}
                    primaryTypographyProps={{
                      fontSize: { xs: "4vw", sm: "4vw", md: "2vw" },
                      textTransform: "capitalize",
                      color: menuItemColor[item].color,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <div>
            <S.FlexCont mobile={false}>{avatar}</S.FlexCont>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { xs: "block", sm: "block", md: "none" },
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
