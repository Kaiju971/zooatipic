import React from "react";
import {
  Breadcrumbs,
  ImageListItem,
  Link,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { articleWithPhoto } from "../../types/produits";

import * as S from "./laboratoire.styled";
import PrimaryButton from "../../components/buttonPrincipale";
import { Panier } from "../../types/panier";
import { fetcharticles } from "../../api/fetchers/article";

interface ProductsData {
  results: articleWithPhoto[];
}

const Laboratoire: React.FC = () => {
  const {
    data: productdata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["photosproduitsbycategorie"],
    queryFn: fetcharticles,
  });

  const saveBasket = (basket: Panier) => {
    localStorage.setItem("basket", JSON.stringify(basket));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <S.MainContainer>
      <S.BreadcrumbsContainer>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          separator={
            <DoubleArrowIcon
              fontSize="small"
              sx={{
                color: "colorOrangeMenu.main",
                transform: "rotate(90deg)",
              }}
            />
          }
        >
          <Link underline="hover" color="inherit" href="/">
            <Typography variant="h6" color="colorOrangeMenu.main">
              Accueil
            </Typography>
          </Link>
          <Link underline="hover" color="inherit" href="/categories">
            <Typography variant="h6" color="colorOrangeMenu.main">
              Nos residents
            </Typography>
          </Link>
          <Typography variant="h6">LABORATOIRE DE CONFISERIES </Typography>
        </Breadcrumbs>
      </S.BreadcrumbsContainer>

      <S.StyledImageBox>
        <Typography variant="h1">LABORATOIRE DE CONFISERIES</Typography>
        <S.StyledImageList cols={4}>
          {productdata !== undefined &&
            productdata?.results?.length > 0 &&
            productdata?.results?.map((item) => (
              <>
                <ImageListItem key={item.id}>
                  <S.Image
                    srcSet={`${item.lien}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.lien}?w=100&h=100&fit=crop&auto=format`}
                    alt=""
                    loading="lazy"
                  />
                </ImageListItem>
                <ListItemText>
                  <PrimaryButton
                    label="Acheter"
                    onClick={() =>
                      saveBasket({
                        id_article: item.id_article,
                        prix: item.prix,
                        quantité: item.quantité,
                        article: item.article,
                      })
                    }
                  />
                </ListItemText>
              </>
            ))}
        </S.StyledImageList>
      </S.StyledImageBox>
    </S.MainContainer>
  );
};

export default Laboratoire;
