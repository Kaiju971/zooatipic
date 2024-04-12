import React, { lazy, useContext } from "react";
import { Routes as Router, Route } from "react-router";
import { Routes } from "./routes";
import withSuspense from "../hoc/withSuspense";
import NotFound from "../pages/notFound/notFound";
import AuthContext from "../store/auth/AuthContextProvider";
// import { UserRoles } from "../constants/roles";

const Accueil = lazy(() => import("../pages/accueil/accueil"));
const Connexion = lazy(() => import("../pages/connexion"));
const Admin = lazy(() => import("../pages/admin/admin"));
const Apropos = lazy(() => import("../pages/apropos/apropos"));
const Produits = lazy(() => import("../pages/produits/produits"));

// const CartProduit = lazy(() => import("../pages/descriptionProduit"));
// const Façonnage = lazy(() => import("../pages/façonnage/façonnage"));
// const Devis = lazy(() => import("../pages/devis/devis"));
// const Auth = lazy(() => import("../pages/admin/auth"));
// const Carousel = lazy(() => import("../shared/carousel2D"));

export const AppRoutes: React.FunctionComponent = () => {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.role === UserRoles.ADMINISTRATEUR;

  function withSuspense(
    Accueil: React.LazyExoticComponent<React.ComponentType<any>>
  ): React.ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <Router>
      <Route path={Routes.accueil} element={withSuspense(Accueil)} />
      {/* <Route path={Routes.contact} element={withSuspense(Contact)} /> */}
      {isAdmin && <Route path={Routes.admin} element={withSuspense(Admin)} />}
      <Route path={Routes.login} element={withSuspense(Auth)} />
      <Route path={Routes.apropos} element={withSuspense(Apropos)} />
      <Route path={Routes.produits} element={withSuspense(Produits)} />
      {/* <Route path={Routes.cartproduit} element={withSuspense(CartProduit)} />
      <Route path={Routes.façonnage} element={withSuspense(Façonnage)} />
      <Route path={Routes.devis} element={withSuspense(Devis)} />
      <Route path={Routes.carousel} element={withSuspense(Carousel)} /> */}
      <Route path="*" element={<NotFound />} />
    </Router>
  );
};
export { Routes };
