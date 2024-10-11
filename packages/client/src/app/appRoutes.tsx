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
const Categories = lazy(() => import("../pages/categories"));
const Produits = lazy(() => import("../pages/produits"));
const Panier = lazy(() => import("../pages/panier"));
const Vente = lazy(() => import("../pages/vente"));
const Profil = lazy(() => import("../pages/profil"));
const Laboratoire = lazy(() => import("../pages/laboratoire"));
const Billets = lazy(() => import("../pages/billet"));

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
      <Route path={Routes.categories} element={withSuspense(Categories)} />
      <Route path={Routes.produits} element={withSuspense(Produits)} />
      <Route path={Routes.panier} element={withSuspense(Panier)} />
      <Route path={Routes.connexion} element={withSuspense(Connexion)} />
      <Route path={Routes.profil} element={withSuspense(Profil)} />
      <Route path={Routes.laboratoire} element={withSuspense(Laboratoire)} />
      <Route path={Routes.billets} element={withSuspense(Billets)} />

      <Route path="*" element={<NotFound />} />
    </Router>
  );
};
export { Routes };
