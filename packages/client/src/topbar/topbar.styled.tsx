import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  width: 100%;
  height: 100%;
`;

export const FlexBox = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const LogoMain = styled("img")`
  height: 15vh;
  @media (max-width: 900px) {
    height: 10vh;
  }
`;

export const DrawerBox = styled(Drawer)`
  & .MuiDrawer-paper {
    background-color: red;
    box-sizing: "border-box";
    max-height: 100vh;
    position: fixed;
    width: 30%;

    @media (max-width: 960px) {
      width: 50%;
    }

    @media (max-width: 760px) {
      width: 100%;
    }
  }
`;

export const DrawerBodyBox = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  text-align: center;

  background: radial-gradient(circle at top left, #ffffff 35%, transparent 36%),
    radial-gradient(circle at top left, #f59494df 40%, transparent 41%),
    radial-gradient(circle at top left, #fa3434 45%, transparent 46%);
`;

export const CloseIconStyle = styled("div")`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  color: ${({ theme }) => theme.palette.secondary.main};

  .close {
    text-transform: capitalize;
    opacity: 0;
    font-weight: 400;

    @media (max-width: 750px) {
      font-size: 4vw;
    }
  }

  &:hover .close {
    cursor: pointer;
    opacity: 1;

    -webkit-animation: slide-top 0.5s ease-out both;
    animation: slide-top 0.5s ease-out both;

    /*
 * ----------------------------------------
 * animation slide-top
 * ----------------------------------------
 */
    @-webkit-keyframes slide-top {
      0% {
        -webkit-transform: translateY(70px);
        transform: translateY(70px);
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
    @keyframes slide-top {
      0% {
        -webkit-transform: translateY(70px);
        transform: translateY(70px);
      }
      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
  }
`;

export const LogoContainer = styled("div")`
  width: 100%;
  position: relative;
  padding-top: 29.69%;
`;

export const LogoImage = styled("img")`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const LoginContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListItemText = styled("div")`
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const ListItemIcon = styled("div")`
  display: flex;
  justify-content: center;
`;
