import { useCallback, useContext, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { MenuItemsAvatar } from "../constants/menuItemsAvatar";
import AuthContext from "../store/auth/AuthContextProvider";
import { UserRoles } from "../constants/roles";
import { useNavigate } from "react-router";
import { Routes } from "../app/routes";

const menuItemsArray = Object.values(MenuItemsAvatar);

function IconAvatar() {
  const { globalLogOutDispatch, authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleItemMenu = useCallback(
    (item: MenuItemsAvatar) => {
      authState.isLoggedIn ? globalLogOutDispatch() : navigate(Routes.login);
    },
    [authState.isLoggedIn, globalLogOutDispatch, navigate]
  );

  return (
    <Box sx={{ flexGrow: 0, width: "5vw" }}>
      <Tooltip title="Menu déroulant">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="avatar"
            src="/static/images/avatar/2.jpg"
            sx={{ width: "50px", height: "50px" }}
          >
            Name
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItemsArray.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleItemMenu(item)}
            sx={{
              textTransform: "capitalize",
              textAlign: "left",
              display:
                (item === MenuItemsAvatar.ADMIN &&
                  (!authState.isLoggedIn ||
                    authState.role === UserRoles.VISITEUR)) ||
                (authState.isLoggedIn && item === MenuItemsAvatar.LOGIN) ||
                (!authState.isLoggedIn && item === MenuItemsAvatar.LOGOUT)
                  ? "none"
                  : "flex",
              "&.Mui-selected": {
                backgroundColor: "transparent",
                borderRadius: "10px",
                boxShadow: " rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
                textShadow: "1px 1px white, -1px -1px black",
              },
              "&:hover": {
                borderRadius: "10px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
              },
            }}
          >
            <Typography textAlign="center">{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
export default IconAvatar;
