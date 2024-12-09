import React, { lazy, useContext } from "react";
import { Routes as Router, Route } from "react-router";
import { Routes } from "./routes";
import withSuspense from "../hoc/withSuspense";
import NotFound from "../pages/notFound/notFound";
import AuthContext from "../store/auth/AuthContextProvider";
import { UserRoles } from "../constants/roles";

const Accueil = lazy(() => import("../pages/accueil/accueil"));
const Connexion = lazy(() => import("../pages/connexion"));
const Admin = lazy(() => import("../pages/admin/admin"));
const Notreparc = lazy(() => import("../pages/notreparc/notreparc"));
const Nosrésidents = lazy(() => import("../pages/nosresidents"));
const Produits = lazy(() => import("../pages/produits"));
const Races = lazy(() => import("../pages/races"));
const Panier = lazy(() => import("../pages/panier/panierStepper"));
const Vente = lazy(() => import("../pages/vente"));
const Profil = lazy(() => import("../pages/profil"));
const Laboratoire = lazy(() => import("../pages/laboratoire"));
const Billets = lazy(() => import("../pages/billet"));
const Livraison = lazy(() => import("../pages/panier/livraison"));
const Loi = lazy(() => import("../pages/loi"));
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
      <Route path={Routes.notreparc} element={withSuspense(Notreparc)} />
      <Route path={Routes.nosrésidents} element={withSuspense(Nosrésidents)} />
      <Route path={Routes.produits} element={withSuspense(Produits)} />
      <Route path={Routes.races} element={withSuspense(Races)} />
      <Route path={Routes.panier} element={withSuspense(Panier)} />
      <Route path={Routes.connexion} element={withSuspense(Connexion)} />
      <Route path={Routes.profil} element={withSuspense(Profil)} />
      <Route path={Routes.laboratoire} element={withSuspense(Laboratoire)} />
      <Route path={Routes.billets} element={withSuspense(Billets)} />
      <Route path={Routes.livrasion} element={withSuspense(Livraison)} />
      <Route path={Routes.loi} element={withSuspense(Loi)} />
      <Route path="*" element={<NotFound />} />
    </Router>
  );
};
export { Routes };
