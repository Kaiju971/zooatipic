import React from "react";
import { Breadcrumbs, ImageListItem, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { ProduitsWithPhoto } from "../../types/produits";
import { useNavigate, useParams } from "react-router";
import { fetchProducts } from "../../api/fetchers/produit";

import * as S from "./produits.styled";

interface ProductsData {
  results: ProduitsWithPhoto[];
}

const Produits: React.FC = () => {
  const navigate = useNavigate();
  const { animalId, animal, background } = useParams<{
    animalId: string | undefined;
    animal: string;
    background: string | undefined;
  }>();

  const {
    data: productdata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["photosproduitsbycategorie", animalId],
    queryFn: () => fetchProducts({ animalId: animalId ?? "" }),
    enabled: !!animalId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <S.MainContainer background={background}>
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
          <Link underline="hover" color="inherit" href="/nosrésidents">
            <Typography variant="h6" color="colorOrangeMenu.main">
              Nos residents
            </Typography>
          </Link>
          <Typography variant="h6">{animal} </Typography>
        </Breadcrumbs>
      </S.BreadcrumbsContainer>

      <S.StyledImageBox>
        <Typography variant="h1">{animal}</Typography>
        <S.StyledImageList cols={4}>
          {productdata !== undefined &&
            productdata?.results?.length > 0 &&
            productdata?.results?.map((item) => (
              <ImageListItem key={item.id}>
                <S.Image
                  srcSet={`${item.lien}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.lien}?w=100&h=100&fit=crop&auto=format`}
                  alt=""
                  loading="lazy"
                  onClick={() => {
                    const encodedBackground = encodeURIComponent(
                      background ?? ""
                    );
                    navigate(
                      `/races/${item.id_race}/${item.race}/${animalId}/${animal}/${encodedBackground}`
                    );
                  }}
                />
              </ImageListItem>
            ))}
        </S.StyledImageList>
      </S.StyledImageBox>
      <S.ImageContainerSkull></S.ImageContainerSkull>
    </S.MainContainer>
  );
};

export default Produits;
