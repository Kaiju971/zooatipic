import { useContext, useEffect, useState } from "react";
import { getBasket } from "../../utils/basket";
import { useMutation } from "@tanstack/react-query";
import { Commandes, CommandesReponse } from "../../types/commandes";
import { fetchCommande } from "../../api/fetchers/commande";
import PrimaryButton from "../../components/buttonPrincipale";
import { useNavigate } from "react-router";
import { Routes } from "../../app/routes";
import AuthContext from "../../store/auth/AuthContextProvider";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { Basket } from "../../types/panier";
import { Typography } from "@mui/material";

import * as S from "./panier.styled";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

const currentCommandeDate = `${day}/${month}/${year}`;

const Panier: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [dataComande, setDataCommande] = useState<Commandes[]>();
  const [dataPanier, setDataPanier] = useState<Basket[]>();

  useEffect(() => {
    const basket = getBasket();
    setDataPanier(basket);
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

  const updateQuantity = (id_article: number, newQuantity: number) => {
    setDataPanier((prevDataPanier) =>
      prevDataPanier
        ?.map((item) =>
          item.id_article === id_article
            ? { ...item, quantite: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantite > 0)
    );

    const commande =
      dataPanier &&
      dataPanier.map((item: Basket) => ({
        ...item,
        id_user: Number(authState.userId) ?? 0,
        date: currentCommandeDate,
        date_visite: item.date_visite ?? null,
        numéro: 0,
      }));

    setDataCommande(commande);
  };

  const TraiterPanier = () => {
    console.log(dataComande);
    if (authState.userId !== undefined && Number(authState.userId) > 0) {
      if (dataComande) {
        savePanier(dataComande);
      }
    } else
      enqueueSnackbar("Connectez-vous avec votre compte ou inscrivez-vous", {
        variant: "error",
      });
  };

  return (
    <S.MainContainer>
      <S.PageTitle variant="h1">PANIER</S.PageTitle>
      <S.Title variant="h2">Liste du panier</S.Title>
      <S.BaskeContainer>
        {dataPanier?.map((item) => (
          <S.BasketRow key={item.id_article}>
            <img src={`${item.photo}`} alt="" width="50rem" />
            <S.Article variant="h6"> {item.article}</S.Article>
            <S.Calculator>
              <S.StyledButtonMoins
                variant="text"
                color="secondary"
                onClick={() =>
                  updateQuantity(item.id_article, item.quantite - 1)
                }
              >
                -
              </S.StyledButtonMoins>
              {item.quantite}
              <S.StyledButton
                variant="text"
                color="secondary"
                onClick={() =>
                  updateQuantity(item.id_article, item.quantite + 1)
                }
              >
                +
              </S.StyledButton>
            </S.Calculator>
            <div>Stock:</div>
            <div>{item.stock}</div>
            <div>{item.prix} € PU HT</div>
            <S.Article> {item.prix * item.quantite} € PU HT</S.Article>
          </S.BasketRow>
        ))}
        <S.Total>
          <Typography variant="h5" fontWeight="900">
            Hors taxe
          </Typography>
          <Typography variant="h5" fontWeight="900">
            {dataPanier
              ?.reduce((sum, item) => sum + item.prix * item.quantite, 0)
              .toFixed(2)}
            € HT
          </Typography>
          <Typography variant="h6" fontWeight="900">
            Taxe/VA 20%
          </Typography>
          <Typography variant="h6" fontWeight="900">
            {dataPanier
              ?.reduce((acc, item) => acc + (item.prix * item.quantite) / 5, 0)
              .toFixed(2)}
            € HT
          </Typography>
          <Typography variant="h5" fontWeight="900">
            Toutes taxes comprises
          </Typography>
          <Typography variant="h5" fontWeight="900">
            {dataPanier
              ?.reduce(
                (acc, item) =>
                  acc +
                  item.prix * item.quantite +
                  (item.prix * item.quantite) / 5,
                0
              )
              .toFixed(2)}
            € HT
          </Typography>
        </S.Total>
      </S.BaskeContainer>
      <PrimaryButton
        label="Confirmer le commande"
        onClick={() => TraiterPanier()}
      />
    </S.MainContainer>
  );
};

export default Panier;
