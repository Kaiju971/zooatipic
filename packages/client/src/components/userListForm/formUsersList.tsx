import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth/AuthContextProvider";
import TextField from "@mui/material/TextField";
import { MenuItem, Pagination, Typography, useMediaQuery } from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "../../axios";
import { paginator } from "../paginator";
import { theme } from "../../app/app";
// import useApiServce from "../../hooks/service/useAPIservice";
import { User } from "../../types/users";
import { UserRoles } from "../../constants/roles";

import * as S from "./formUsersList.styled";

type editedData = {
  nom: number;
  prenom: string;
  email: number;
  role: string;
  id_role: boolean;
};

const userRolessArray = Object.values(UserRoles);

type DataUrlMap = {
  [id_user: number]: string;
};

const headTabArray = [
  "№",
  "Nom",
  "Prénom",
  "Email",
  "Role",
  "Avatar",
  "Modifier",
  "Delete",
];

const FormUsers: React.FC = () => {
  const { authState, registerChange, changeCounter } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  // const { request, setError } = useApiServce();
  const [userdata, setUserdata] = useState<User[]>([]);
  const [editedData, setEditedData] = useState<{
    [key: string]: editedData;
  }>({});
  const [user, setUser] = useState<User>({
    id: 0,
    nom: "",
    prenom: "",
    email: "",
    role: "",
    id_role: 0,
    image: { data: null },
    id_adresse: 0,
    numero: "",
    adresse: "",
    code_postal: 0,
    ville: "",
  });
  const [userId, setUserId] = useState(0);
  const [userIdDel, setUserIdDel] = useState(0);
  const [dataUrl, setDataUrl] = useState<DataUrlMap>({});
  const userRole = authState.role;
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const elemPerPage = matchDownMd ? 1 : 10;
  const count = Math.ceil(userdata.length / elemPerPage);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(paginator(userdata, value, elemPerPage).page);
  };

  const showError = (err: any, mess: string) => {
    enqueueSnackbar(mess, { variant: "error" });
    console.error(err);
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    itemId: number
  ) => {
    setUser({
      ...user,
      [event.target?.name]: event.target?.value,
    });
    setEditedData((prevData) => ({
      ...prevData,
      [itemId]: {
        ...prevData[itemId],
        [event.target?.name]: event.target?.value,
      },
    }));
  };

  useEffect(() => {
    const fetchGet = async () => {
      const headers = { "x-access-token": authState.authToken };
      await axios
        .get(`users`, { headers })
        .then((response) => {
          setUserdata(response.data.results[0]);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchGet();
  }, [authState, changeCounter]);

  useEffect(() => {
    if (userdata) {
      const tempUrl: DataUrlMap = {};

      userdata.forEach((el) => {
        if (el.hasOwnProperty("image") && el.image) {
          const uint8Array = new Uint8Array(el.image.data ?? []);
          const blob = new Blob([uint8Array], { type: "image/jpg" });

          tempUrl[el.id] = URL.createObjectURL(blob);
        }
      });
      setDataUrl(tempUrl);
    }
  }, [userdata]);

  const handleDelete = (id: number) => {
    // const params = {
    //   id: id,
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-access-token": authState.authToken,
    //   },
    // };
    // try {
    //   request("DELETE", `delete`, params, setUserIdDel);
    // } catch (error: any) {
    //   setError(error.message || error);
    //   showError(error, error.message);
    // }
  };

  useEffect(() => {
    if (userIdDel) {
      registerChange();
      enqueueSnackbar("L'utilisateur a éte supprimé avec succès", {
        variant: "success",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdDel]);

  useEffect(() => {
    if (userId) {
      registerChange();
      enqueueSnackbar("L'utilisateur a eté modifié avec succès", {
        variant: "success",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handlePut = (id: string) => {
    // const params = {
    //   data: user,
    //   id: id,
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-access-token": authState.authToken,
    //   },
    // };
    // if (Object.keys(editedData).length) {
    //   try {
    //     request("PUT", `update`, params, setUserId);
    //   } catch (error: any) {
    //     setError(error.message || error);
    //     showError(error, error.message);
    //   }
    // } else
    //   enqueueSnackbar("Aucun changement effectué", {
    //     variant: "info",
    //   });
  };
  return (
    <S.MainContainer>
      <Typography
        variant="h2"
        textAlign="center"
        sx={{
          color: "colorRougeOpacity.main",
        }}
      >
        Utilisateurs
      </Typography>

      <br />
      <S.StyledBox component="form">
        <S.GridContainerTitre>
          {headTabArray.map((item) => (
            <div> {item}</div>
          ))}
        </S.GridContainerTitre>
        {paginator(userdata, page, elemPerPage).data.map((item, index) => (
          <S.GridContainerMain key={index}>
            {matchDownMd ? "" : <div>{index + 1}</div>}
            <S.TextFieldContainer>
              <TextField
                variant="standard"
                type="text"
                fullWidth
                name="nom"
                value={editedData[item.id]?.nom || item?.nom}
                disabled={userRole === UserRoles.ADMINISTRATEUR ? false : true}
                onChange={(e) => onInputChange(e, item?.id)}
              />
            </S.TextFieldContainer>
            <S.TextFieldContainer>
              <TextField
                variant="standard"
                type="text"
                fullWidth
                name="prenom"
                value={editedData[item.id]?.prenom || item?.prenom}
                disabled={userRole === UserRoles.ADMINISTRATEUR ? false : true}
                onChange={(e) => onInputChange(e, item?.id)}
              />
            </S.TextFieldContainer>
            <S.TextFieldContainer>
              <TextField
                variant="standard"
                type="text"
                fullWidth
                name="email"
                value={editedData[item.id]?.email || item?.email}
                disabled={userRole === UserRoles.ADMINISTRATEUR ? false : true}
                onChange={(e) => onInputChange(e, item?.id)}
              />
            </S.TextFieldContainer>
            <S.TextFieldContainer>
              <TextField
                variant="standard"
                select
                type="text"
                fullWidth
                name="role"
                value={editedData[item.id]?.role || item?.role}
                disabled={userRole === UserRoles.ADMINISTRATEUR ? false : true}
                onChange={(e) => onInputChange(e, item?.id)}
              >
                {userRolessArray?.map((item1, index) => (
                  <MenuItem key={index} value={item1}>
                    {item1}
                  </MenuItem>
                ))}
              </TextField>
            </S.TextFieldContainer>
            <S.StyledAvatar alt="user avatar" src={dataUrl[item.id]} />
            <S.ButtonMod onClick={() => handlePut(item?.id.toString())}>
              <Typography variant="body1">Modifier</Typography>
            </S.ButtonMod>
            <S.ButtonMod onClick={() => handleDelete(item?.id)}>
              <Typography variant="body1">Supprimer</Typography>
            </S.ButtonMod>
          </S.GridContainerMain>
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={count} page={page} onChange={handleChange} />
        </div>
      </S.StyledBox>
    </S.MainContainer>
  );
};

export default FormUsers;
