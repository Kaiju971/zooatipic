import { useNavigate } from "react-router";
import PrimaryButton from "../../components/buttonPrincipale";

import * as S from "./panier.styled";
import { Routes } from "../../app/routes";

const Panier: React.FC = () => {
  const navigate = useNavigate();
  return (
    <S.MainContainer>
      <S.PageTitle variant="h1">PANIER</S.PageTitle>
      <S.Title>Méthode de livraison</S.Title>

      <PrimaryButton
        label="Passer qu paiement"
        onClick={() => navigate(Routes.accueil)}
      />
    </S.MainContainer>
  );
};

export default Panier;
