import React from "react";

import { Container } from "./routeLoader.styled";
import LoadingSection from "../components/connexion/LoadingSection";

const RouteLoader: React.FC = () => {

  return (
    <Container>
        <LoadingSection />
    </Container>
  );
};

export default RouteLoader;
