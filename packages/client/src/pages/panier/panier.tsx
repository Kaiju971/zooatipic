import { useContext, useEffect, useState } from "react";
import { changeQuantity, getBasket } from "../../utils/basket";
import PrimaryButton from "../../components/buttonPrincipale";
import { useLocation } from "react-router";
import AuthContext from "../../store/auth/AuthContextProvider";
import { useSnackbar } from "notistack";
import { Basket } from "../../types/panier";
import { Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import * as S from "./panier.styled";

interface PanierProps {
  onNext: () => void;
}

const Panier: React.FC<PanierProps> = ({ onNext }) => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [dataPanier, setDataPanier] = useState<Basket[]>();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const basket = getBasket();
    setDataPanier(basket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.userId]);

  const updateQuantity = (id_article: number, newQuantity: number) => {
    const updatedPanier = dataPanier
      ?.map((item) =>
        item.id_article === id_article
          ? { ...item, quantite: Math.max(0, newQuantity) }
          : item
      )
      .filter((item) => item.quantite > 0);

    setDataPanier(updatedPanier);
    changeQuantity(id_article, newQuantity);
  };

  const TraiterPanier = () => {
    if (authState.userId !== undefined && Number(authState.userId) > 0) {
      if (dataPanier) onNext();
    } else
      enqueueSnackbar("Connectez-vous avec votre compte ou inscrivez-vous", {
        variant: "error",
      });
  };

  return (
    <S.MainContainer>
      <S.PageTitle variant="h1">PANIER</S.PageTitle>
      <S.BasketContainer>
        <S.Triangle />
        <S.Triangle2 />
        <S.BasketRow>
          <div></div>
          <Typography variant="h4" fontWeight="900">
            Produits
          </Typography>
          <Typography variant="h4" fontWeight="900">
            Prix
          </Typography>
          <Typography variant="h4" fontWeight="900">
            Quantité
          </Typography>
          <Typography variant="h4" fontWeight="900">
            Total
          </Typography>
          <b></b>
        </S.BasketRow>
        {dataPanier?.map((item) => (
          <S.BasketRow key={item.id_article}>
            <S.ImageStock>
              <img src={`${item.photo}`} alt="" width="70rem" />
              <div>
                {item.stock > 0 ? (
                  <Typography variant="body1" color="colorVertMenu.main">
                    en stock
                  </Typography>
                ) : (
                  <Typography variant="body1" color="rouge.main">
                    rupture de stock
                  </Typography>
                )}
              </div>
            </S.ImageStock>
            <S.Article variant="h4"> {item.article}</S.Article>
            <div>{item.prix} €</div>
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
            <S.Article> {item.prix * item.quantite} €</S.Article>
            <S.FlexBox>
              <DeleteForeverIcon
                color="error"
                onClick={() => updateQuantity(item.id_article, 0)}
                sx={{ cursor: "pointer", zIndex: 10 }}
              />
            </S.FlexBox>
          </S.BasketRow>
        ))}
        <S.Title variant="h2">TOTAL ACHAT</S.Title>
        <S.Total>
          <Typography variant="h5" fontWeight="900">
            Hors taxe
          </Typography>
          <Typography variant="h5">
            {dataPanier
              ?.reduce((sum, item) => sum + item.prix * item.quantite, 0)
              .toFixed(2)}
            €
          </Typography>
          <Typography variant="h6" fontWeight="900">
            TVA 20%
          </Typography>
          <Typography variant="h6">
            {dataPanier
              ?.reduce((acc, item) => acc + (item.prix * item.quantite) / 5, 0)
              .toFixed(2)}
            €
          </Typography>
          <Typography variant="h5" fontWeight="900">
            Total TTC
          </Typography>
          <Typography variant="h5">
            {dataPanier
              ?.reduce(
                (acc, item) =>
                  acc +
                  item.prix * item.quantite +
                  (item.prix * item.quantite) / 5,
                0
              )
              .toFixed(2)}
            €
          </Typography>
        </S.Total>
        <S.ButtonContainer>
          <PrimaryButton
            label={
              <Typography variant="h6" textTransform="none">
                Choisisr ma livraison
              </Typography>
            }
            colorVert
            onClick={() => TraiterPanier()}
          />
        </S.ButtonContainer>
      </S.BasketContainer>
    </S.MainContainer>
  );
};

export default Panier;
