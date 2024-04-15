import { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { Routes } from "../../app/routes";
import { Categorie, ProduitWithPhoto } from "../../types/produits";

import * as S from "./cartProduits.styled";

type Props = {
  element?: Categorie;
  hidden?: boolean;
  elProduit?: ProduitWithPhoto;
};
const CartProduit: React.FC<Props> = ({
  element,
  hidden = false,
  elProduit = undefined,
}) => {
  const navigate = useNavigate();
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (element?.photo_principale) {
      setDataUrl(element?.photo_principale);
    }
    if (elProduit !== undefined && elProduit?.photo) {
      setDataUrl(elProduit?.photo);
    }
  }, [elProduit, element]);

  const openCard = () => {
    let categorieId;
    if (typeof element === "number") categorieId = element;
    else categorieId = element?.id ?? elProduit?.id_categorie;
    const produitId = elProduit?.id ?? 0;
    navigate(Routes.cartproduit, {
      state: { categorieId: categorieId, produitId: produitId },
    });
  };

  if (hidden) return null;

  return (
    <S.MainContainer>
      <S.ImageButton
        focusRipple
        onClick={() => {
          openCard();
        }}
      >
        <CardMedia
          component="img"
          image={dataUrl}
          alt={element?.categorie ?? elProduit?.titre}
          sx={{
            width: "99%",
            height: "99%",
            boxShadow: "14px 14px 14px red",
          }}
        />
        <S.ImageBackdrop className="MuiImageBackdrop-root" />

        <S.Image>
          <S.FlexContainer>
            <Typography
              component="div"
              variant="h2"
              color="inherit"
              sx={{
                position: "relative",
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {elProduit?.categorie ?? element?.categorie ?? ""}
              <S.ImageMarked className="MuiImageMarked-root" />
            </Typography>
            {elProduit?.titre ? (
              <Typography
                component="div"
                variant="h2"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {elProduit?.titre}
              </Typography>
            ) : null}
          </S.FlexContainer>
        </S.Image>
      </S.ImageButton>
    </S.MainContainer>
  );
};

export default CartProduit;
