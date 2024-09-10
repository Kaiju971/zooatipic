import React from "react";
import { Breadcrumbs, ImageListItem, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { CategorieWithPhoto } from "../../types/produits";
import camion from "../../images/livraison.jpg";
import labo from "../../images/laboratoire.jpg";
import emporter from "../../images/a_emporter.jpg";
import food from "../../images/catFood.jpg";
import { useNavigate } from "react-router";
import { Routes } from "../../app/routes";
import { fetchCategories } from "../../api/fetchers/categories";

import * as S from "./categories.styled";

interface ProductsData {
  results: CategorieWithPhoto[];
}

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: categoriedata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["photoscategorie"],
    queryFn: fetchCategories,
  });

  const openRace = (animalId: number, animal: string, background: string) => {
    const encodedBackground = encodeURIComponent(background);
    navigate(`/produits/${animalId}/${animal}/${encodedBackground}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div>
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
              <Typography variant="body2" color="colorOrangeMenu.main">
                Accueil
              </Typography>
            </Link>
            <Typography variant="body2">Produits</Typography>
          </Breadcrumbs>
        </S.BreadcrumbsContainer>
        <S.StyledImageBox>
          <Typography variant="h1">NOS RESIDENTS</Typography>
          <S.StyledImageList cols={4}>
            {categoriedata !== undefined &&
              categoriedata?.results?.length > 0 &&
              categoriedata?.results?.map((item) => (
                <ImageListItem key={item.id}>
                  <S.Image
                    srcSet={`${item.lien}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.lien}?w=100&h=100&fit=crop&auto=format`}
                    alt=""
                    loading="lazy"
                    onClick={() =>
                      openRace(item.id_animal, item.animal, item.background)
                    }
                  />
                </ImageListItem>
              ))}
          </S.StyledImageList>
          <S.StyledFlexBox>
            <S.ContainerGrid onClick={() => navigate(Routes.vente)}>
              <S.ContainerGeneral>
                <S.ImageContainer1>
                  <S.ImageTurn src={camion} alt="" />
                </S.ImageContainer1>
                <S.ImageContainer2 className="grid">
                  <S.ImageTurn src={food} alt="" />
                  <S.StyledTypography
                    variant="body2"
                    fontWeight="900"
                    className="text"
                  >
                    METHODE DE LIVRAISON
                  </S.StyledTypography>
                </S.ImageContainer2>
                <S.ImageContainer3>
                  <S.ImageTurn src={emporter} alt="" />
                </S.ImageContainer3>
                <S.ImageContainer4>
                  <S.ImageTurn src={labo} alt="" />
                </S.ImageContainer4>
              </S.ContainerGeneral>
            </S.ContainerGrid>
            <S.ContainerTexte>
              <Typography variant="h6">Nos propositions</Typography>
              <Typography variant="h6">
                Venez voir nos animaux vous pourrez également leurs donner de la
                nourriture mais pas que, vous pourrez également confectionner de
                la nourriture spécialement pour votre animal de compagnie
              </Typography>
            </S.ContainerTexte>
          </S.StyledFlexBox>
        </S.StyledImageBox>
      </S.MainContainer>
    </div>
  );
};

export default Categories;
