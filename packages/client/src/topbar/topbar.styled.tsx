import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
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
    box-sizing: "border-box";
    max-height: 100vh;
    position: fixed;
    padding-left: 5%;
    background: linear-gradient(
      172.56deg,
      rgba(255, 199, 0, 0.6) 0%,
      rgba(184, 186, 108, 0.8) 41%,
      #7a6e41 77.5%
    );

    @media (min-width: 760px) {
      display: none;
    }

    @media (max-width: 760px) {
      width: 70%;
      display: block;
    }

    @media (max-width: 568px) {
      width: 100%;
    }
  }
`;

export const DrawerBodyBox = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: start;
  text-align: center;
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
  align-items: end;
`;

export const ListItemIcon = styled("div")`
  display: flex;
  justify-content: center;
`;

export const FlexCont = styled("div")<{ mobile: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 750px) {
    display: ${({ mobile }) => (mobile ? "flex" : "none")};
    margin-left: 5%;
    width: 80%;
  }
`;
