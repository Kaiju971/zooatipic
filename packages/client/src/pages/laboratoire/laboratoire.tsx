import React from "react";
import {
  Breadcrumbs,
  ImageListItem,
  Link,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { ArticleWithPhoto } from "../../types/produits";
import PrimaryButton from "../../components/buttonPrincipale";
import { fetchArticlesWithPhotos } from "../../api/fetchers/articlesWithPhotos";
import { addBasket } from "../../utils/basket";
import { theme } from "../../app/app";

import * as S from "./laboratoire.styled";

interface ProductsData {
  results: ArticleWithPhoto[];
}

const Laboratoire: React.FC = () => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const {
    data: articlesdata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["photosarticles"],
    queryFn: () => fetchArticlesWithPhotos({ categorieVentes: "nourriture" }),
  });

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
        <S.StyledImageList cols={matchDownSm ? 1 : matchDownMd ? 2 : 3}>
          {articlesdata !== undefined &&
            articlesdata?.results?.length > 0 &&
            articlesdata?.results?.map((item) => (
              <S.ListItemContainer>
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
                    label={
                      <>
                        {item.prix} € <br /> Acheter
                      </>
                    }
                    onClick={() =>
                      addBasket({
                        id_article: item.id_article,
                        prix: item.prix,
                        quantite: item.quantite,
                        article: item.article,
                        photo: item.lien,
                        stock: item.stock,
                        date_visite: "",
                      })
                    }
                    disabled={item.stock <= 0}
                  />
                </ListItemText>
                <ListItemText>
                  {item.stock > 0 ? (
                    <Typography variant="body1" color="colorVertButton.main">
                      en stock
                    </Typography>
                  ) : (
                    <Typography variant="body1" color="rouge.main">
                      rupture de stock
                    </Typography>
                  )}
                </ListItemText>
              </S.ListItemContainer>
            ))}
        </S.StyledImageList>
      </S.StyledImageBox>
    </S.MainContainer>
  );
};

export default Laboratoire;
