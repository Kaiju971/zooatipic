import React, { lazy, useContext } from "react";
import { Routes as Router, Route } from "react-router";
import { Routes } from "./routes";
import withSuspense from "../hoc/withSuspense";
import NotFound from "../pages/notFound/notFound";
import AuthContext from "../store/auth/AuthContextProvider";
import { UserRoles } from "../constants/roles";

// import { UserRoles } from "../constants/roles";

const Accueil = lazy(() => import("../pages/accueil/accueil"));
const Connexion = lazy(() => import("../pages/connexion"));
const Admin = lazy(() => import("../pages/admin/admin"));
const Apropos = lazy(() => import("../pages/apropos/apropos"));
const Produits = lazy(() => import("../pages/produits/produits"));
const Panier = lazy(() => import("../pages/panier"));
const Vente = lazy(() => import("../pages/vente"));
const Profil = lazy(() => import("../pages/profil"));

const Auth = lazy(() => import("../pages/admin/auth"));

export const AppRoutes: React.FunctionComponent = () => {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.role === UserRoles.ADMINISTRATEUR;

  return (
    <Router>
      <Route path={Routes.accueil} element={withSuspense(Accueil)} />
      <Route path={Routes.vente} element={withSuspense(Vente)} />
      {isAdmin && <Route path={Routes.admin} element={withSuspense(Admin)} />}
      <Route path={Routes.login} element={withSuspense(Auth)} />
      <Route path={Routes.apropos} element={withSuspense(Apropos)} />
      <Route path={Routes.produits} element={withSuspense(Produits)} />
      <Route path={Routes.panier} element={withSuspense(Panier)} />
      <Route path={Routes.connexion} element={withSuspense(Connexion)} />
      <Route path={Routes.profil} element={withSuspense(Profil)} />
      <Route path="*" element={<NotFound />} />
    </Router>
  );
};
export { Routes };
