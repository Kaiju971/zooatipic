import { useEffect, useState, useContext, FormEventHandler } from "react";
import AuthContext from "../../store/auth/AuthContextProvider";
import { AuthData } from "../../types/apiData";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "../../axios";
import { AxiosError } from "axios";
import { MIN_SIZE_IMAGE, MAX_SIZE_IMAGE } from "../../constants/index";
import FormConnection from "../../components/formConnexion/formConnexion";
import { UserRoles } from "../../constants/roles";

import * as S from "./auth.styled";

const Auth = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [authData, setAuthData] = useState<AuthData>();
  const { globalLogInDispatch, registerChange } = useContext(AuthContext);
  const location = useLocation();
  const currentPathArray = location.pathname.split("/");

  const isAdmin = currentPathArray[currentPathArray.length - 1] === "admin";

  const showError = (err: any, mess: string) => {
    enqueueSnackbar(mess, { variant: "error" });
    console.error(err);
  };

  // Upon successful response from the api for login user, dispatch global auth LOG_IN event
  useEffect(() => {
    if (authData && "success" in authData) {
      if (isAdmin) {
        registerChange();
        enqueueSnackbar("L'utilisateur est crée avec succès", {
          variant: "success",
        });
      } else {
        globalLogInDispatch({
          authToken: authData.user.auth_token,
          userId: authData.user.user_id,
          nom: authData.user.nom,
          prenom: authData.user.prenom,
          email: authData.user.email,
          id_role: authData.user.id_role,
          role: authData.user.role,
        });
        enqueueSnackbar("L'utilisateur est connecté avec succès", {
          variant: "success",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData, globalLogInDispatch]);

  const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const isSignUp = data && data.get("prenom");
    const formdata = new FormData();
    const fileData = data.get("avatar") as File;
    const err = "upload file error";
    if (fileData?.size > 0) {
      const allowedFileTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];

      if (fileData?.size < MIN_SIZE_IMAGE) {
        showError(err, "The file is too small");
      } else if (fileData.size > MAX_SIZE_IMAGE) {
        showError(err, "The file is too large");
      } else if (!allowedFileTypes.includes(fileData.type)) {
        showError(err, "The type of file is not valid");
      } else {
        if (fileData && fileData?.size > 0) {
          if (fileData) formdata.append("file", fileData);
        }
      }
    }

    const roleValue = data.get("role")?.toString().toUpperCase();
    let roleIndex = 3;
    if (roleValue !== undefined) {
      roleIndex = Object.keys(UserRoles).indexOf(roleValue) + 1;
    }
    formdata.append("id_role", roleIndex.toString());
    formdata.append("email", data.get("email") ?? "");
    formdata.append("password", data.get("password") ?? "");
    formdata.append("nom", data.get("nom") ?? "");
    formdata.append("prenom", data.get("prenom") ?? "");

    const endpoint = `${isSignUp ? "createuser" : "login"}`;
    const headers = {
      "content-type": `${
        isSignUp ? "multipart/form-data" : "application/json"
      }`,
    };

    axios
      .post(endpoint, formdata, { headers })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .then((response) => {
        setAuthData(response.data);
      })
      .catch((error) => {
        let message = error.toString();
        if (error.hasOwnProperty("response")) {
          message =
            error.response?.data?.message ??
            (((error as AxiosError).response?.data as any)?.error as string);
        }
        enqueueSnackbar(message || "Unknown Error", {
          variant: "error",
        });
      });
  };

  return (
    <S.MainContainer>
      <FormConnection onSubmit={authHandler} />
    </S.MainContainer>
  );
};

export default Auth;
