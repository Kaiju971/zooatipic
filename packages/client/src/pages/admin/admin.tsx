import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState, useContext, useCallback } from "react";
import AuthContext from "../../store/auth/AuthContextProvider";
import Auth from "./auth";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import RoofingIcon from "@mui/icons-material/Roofing";
import HandymanIcon from "@mui/icons-material/Handyman";
// import PhotoService from "../../components/photoService";
import axios from "../../axios";
import { User } from "../../types/users";
import FormUsersList from "../../components/userListForm/formUsersList";
// import ProduitService from "../../components/produitService";
import { useSnackbar } from "notistack";
// import CardUtilisateur from "./cartUtilisateur";
import { theme } from "../../app/app";

import * as S from "./admin.styled";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Admin: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { authState, changeCounter } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [userdata, setUserdata] = useState<User[]>([]);
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  const showError = useCallback(
    (err: any, mess: string) => {
      enqueueSnackbar(mess, { variant: "error" });
      console.error(err);
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    const fetchGet = async () => {
      const headers = {
        "x-access-token": authState.authToken,
        "Content-Type": "application/json",
      };
      await axios
        .get(`users`, { headers })
        .then((response) => {
          setUserdata(response.data.results[0]);
        })
        .catch((error) => {
          showError(
            error,
            error.hasOwnProperty("response")
              ? error?.response?.data.error
              : error.toString()
          );
        });
    };

    fetchGet();
  }, [authState.authToken, changeCounter, showError]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <S.MainContainer>
      <S.InsidedContainer>
        <S.FlexBox>
          <HandymanIcon fontSize="large" />
          <Typography variant="h2" sx={{ pl: 10 }}>
            Page Admin
          </Typography>
        </S.FlexBox>
        <Typography variant="body2" sx={{ pl: 24, pb: 4 }}>
          site managment
        </Typography>

        <S.StyledBox>
          <S.StyledTabs
            horizontal={matchDownLg}
            orientation={matchDownLg ? "horizontal" : "vertical"}
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          >
            <S.StyledTab
              icon={<ManageAccountsIcon />}
              iconPosition="start"
              label="Utilisateurs"
              sx={{
                justifyContent: "start",
              }}
            />
            <S.StyledTab
              icon={<WallpaperIcon />}
              iconPosition="start"
              label="Photos service"
              sx={{
                justifyContent: "start",
              }}
            />
            <S.StyledTab
              icon={<CategoryIcon />}
              iconPosition="start"
              label="Categories"
              sx={{
                justifyContent: "start",
              }}
            />
            <S.StyledTab
              icon={<RoofingIcon />}
              iconPosition="start"
              label="Produits"
              sx={{
                justifyContent: "start",
              }}
            />
          </S.StyledTabs>
          <TabPanel value={value} index={0}>
            <S.StyledTabPanelBox>
              {/* <S.CartGridContainer horizontal={matchDownLg}>
                {userdata?.map((item, index) => (
                  <CardUtilisateur key={index} element={item} />
                ))}
              </S.CartGridContainer> */}
              <Auth />
              <FormUsersList />
            </S.StyledTabPanelBox>
          </TabPanel>
          {/* <TabPanel value={value} index={1}>
            <PhotoService />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProduitService indexTab={value} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ProduitService indexTab={value} />
          </TabPanel> */}
        </S.StyledBox>
      </S.InsidedContainer>
    </S.MainContainer>
  );
};

export default Admin;
