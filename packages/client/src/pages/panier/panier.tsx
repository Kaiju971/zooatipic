import { useContext, useEffect, useState } from "react";
import { getBasket } from "../../utils/basket";
import { useMutation } from "@tanstack/react-query";
import { Commandes, CommandesReponse } from "../../types/commandes";
import { fetchCommande } from "../../api/fetchers/commande";
import PrimaryButton from "../../components/buttonPrincipale";
import { useNavigate } from "react-router";
import { Routes } from "../../app/routes";
import AuthContext from "../../store/auth/AuthContextProvider";

import * as S from "./panier.styled";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

const currentCommandeDate = `${day}/${month}/${year}`;

const Panier: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [dataPanier, setDataPanier] = useState<Commandes[]>();

  useEffect(() => {
    const basket = getBasket();
    const commande =
      basket &&
      basket.map((item: Commandes) => ({
        ...item,
        id_user: authState.userId ?? 0,
        date: currentCommandeDate,
        date_visite: item.date_visite ?? null,
        numéro: 0,
      }));

    setDataPanier(commande);
  }, [authState.userId]);

  const { mutate: savePanier } = useMutation<
    CommandesReponse,
    AxiosError,
    Commandes[]
  >({
    mutationFn: fetchCommande,
    onSuccess: () => {
      navigate(Routes.accueil);
    },
    onError: (error: AxiosError) => {
      console.error(error.response);
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message;
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    },
  });

  const TraiterPanier = () => {
    if (authState.userId !== undefined && Number(authState.userId) > 0) {
      if (dataPanier) {
        savePanier(dataPanier);
      }
    } else
      enqueueSnackbar("Connectez-vous avec votre compte ou inscrivez-vous", {
        variant: "error",
      });
  };

  return (
    <S.MainContainer>
      <S.Page variant="h1">PANIER</S.Page>
      <S.Title>Liste du panier</S.Title>

      {dataPanier?.map((item) => (
        <div key={item.id_article}>
          {item.id_article}
          <br />
          {item.article}
          <br />
          {item.prix}
          <br />
          {item.quantite}
          <br />
        </div>
      ))}
      <PrimaryButton label="Acheter" onClick={() => TraiterPanier()} />
    </S.MainContainer>
  );
};

export default Panier;
