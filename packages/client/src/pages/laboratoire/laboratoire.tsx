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
import { NourritureWithPhoto } from "../../types/produits";

import * as S from "./laboratoire.styled";
import PrimaryButton from "../../components/buttonPrincipale";
import { Panier } from "../../types/panier";
import { fetchNourritures } from "../../api/fetchers/nourriture";

interface ProductsData {
  results: NourritureWithPhoto[];
}

const Laboratoire: React.FC = () => {
  const {
    data: productdata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["photosproduitsbycategorie"],
    queryFn: fetchNourritures,
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
                        id_nourriture: item.id_nourriture,
                        prix: item.prix,
                        quantité: item.quantité,
                        nourriture: item.nourriture,
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
