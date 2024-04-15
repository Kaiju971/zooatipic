import { CSSObject, Theme, styled } from "@mui/material/styles";
import img from "../../images/_2c4d16f4-0ed2-4072-a796-8820155cbfa7.jpg";
import MuiDrawer from "@mui/material/Drawer";
import { ListItemButton } from "@mui/material";

const drawerWidth = 240;

export const MainContainer = styled("div")`
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(
      ${({ theme }) => theme.palette.colorGris.main},
      ${({ theme }) => theme.palette.colorRougeOpacity.main}
    ),
    url(${img}) no-repeat center center;
  background-size: contain;

  @media (max-width: 750px) {
    align-items: center;
    height: 100%;
  }
`;

export const GridContainer = styled("div")`
  margin-top: 4%;
  margin-bottom: 4%;
  grid-row-gap: 5%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;

  @media (max-width: 1500px) {
    margin-left: 5%;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 50% 50%;
    align-items: center;
    grid-row-gap: 2%;
  }

  @media (max-width: 750px) {
    grid-template-columns: 100%;
    margin-left: 10%;
  }

  @media (max-width: 450px) {
    margin-left: 15%;
  }

  @media (max-width: 350px) {
    margin-bottom: 20%;
  }
`;

export const TextFieldContainer = styled("div")`
  display: block;
  width: 15vw;
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};

  @media (max-width: 750px) {
    width: 80vw;
  }
`;

export const FlexContainer = styled("div")`
  display: flex;
  justify-content: center;

  @media (max-width: 750px) {
  }
`;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "linear-gradient(90deg, #f76b07, #f60857, #f70707, #e7f706)",
  backgroundSize: "1000% 1000%",
  animation: "gradient 10s ease infinite",

  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
});

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  height: "max-content",
  flexGrow: 1,
  [theme.breakpoints.down("md")]: {
    paddingBottom: "70%",
  },
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "99%",
  },
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

export const BreadcrumbsContainer = styled("div")`
  padding-top: 18vh;
  padding-left: 8vw;
  font-style: italic;
  z-index: 2000;
`;

export const ListItemButtonContainer = styled(ListItemButton)<{
  open: boolean;
}>`
  display: flex;
  justify-content: ${({ open }) => (open ? "initial" : "end")};
  opacity: ${({ open }) => (open ? 0 : 1)};
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: 900;
  min-height: 48;
  transform: rotate(270deg);
`;
