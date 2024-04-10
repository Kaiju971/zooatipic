import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthActionEnum } from "./authActions";
import authReducer, { AuthState, defaultAuthState } from "./authReducer";
import { Routes } from "../../app/routes";

type AuthProviderProps = {
  children: React.ReactElement;
};

export type UserData = {
  authToken: string;
  userId: string;
  nom: string;
  prenom: string;
  email: string;
  id_role: number;
  role: string;
};

export interface AuthContext {
  authState: AuthState;
  globalLogInDispatch: (props: UserData) => void;
  globalLogOutDispatch: () => void;
  registerChange: () => void;
  changeCounter: number;
}

// Auth context
const authCtx = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => {},
  globalLogOutDispatch: () => {},
  registerChange: () => {},
  changeCounter: 0,
});

export const AuthContextProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
  const [changeCounter, setChangeCounter] = useState(0);
  const navigate = useNavigate();

  const registerChange = () => {
    setChangeCounter((c) => c + 1);
  };

  // Check if user detail is persisted, mostly catering for refreshing of the browser
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData: UserData = JSON.parse(user);
      authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData });
    }
  }, []);

  const globalLogInDispatch = useCallback(
    (props: UserData) => {
      const { authToken, email, nom, prenom, userId, id_role, role } = props;
      authDispatch({
        type: AuthActionEnum.LOG_IN,
        payload: {
          authToken,
          userId,
          nom,
          prenom,
          email,
          id_role,
          role,
        },
      });
      if (role === "administrateur") navigate(Routes.admin);
      else navigate(Routes.accueil);
    },
    [navigate]
  );

  const globalLogOutDispatch = useCallback(() => {
    authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null });
    navigate(Routes.accueil);
  }, [navigate]);

  // context values to be passed down to children
  const ctx = {
    authState,
    globalLogInDispatch,
    globalLogOutDispatch,
    registerChange,
    changeCounter,
  };

  return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>;
};

export default authCtx;
