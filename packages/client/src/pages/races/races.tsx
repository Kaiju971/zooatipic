import React from "react";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { ProduitsWithPhoto } from "../../types/produits";
import { useParams } from "react-router";

import * as S from "./races.styled";
import { getPhotosBy } from "../../api/fetchers/getPhotosBy";

interface ProductsData {
  results: ProduitsWithPhoto[];
}

const Races: React.FC = () => {
  const { raceId, race, animalId, animal, background } = useParams<{
    raceId: string | undefined;
    race: string;
    animalId: string | undefined;
    animal: string;
    background: string | undefined;
  }>();

  const encodedBackground = encodeURIComponent(background ?? "");
  const {
    data: racedata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["getphotosbyraceid", "race", animalId, raceId],
    queryFn: () =>
      getPhotosBy({
        categorie_photo: "race",
        id_animal: animalId,
        id_race: raceId,
      }),
  });

  const {
    data: squelettedata,
    isLoading: isLoadingSquelette,
    isError: isErrorSquelette,
  } = useQuery<ProductsData>({
    queryKey: ["getphotosbyraceid", "squelette", animalId],
    queryFn: () =>
      getPhotosBy({
        categorie_photo: "squelette",
        id_animal: animalId,
        id_race: undefined,
      }),
  });

  console.log(squelettedata);
  if (isLoading || isLoadingSquelette) return <p>Loading...</p>;
  if (isError || isErrorSquelette) return <p>Error loading products</p>;

  return (
    <S.MainContainer background={background}>
      <S.FlexContainer>
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
            <Link
              underline="hover"
              color="inherit"
              href={`/produits/${animalId}/${animal}/${encodedBackground}`}
            >
              <Typography variant="h6" color="colorOrangeMenu.main">
                {animal}
              </Typography>
            </Link>
            <Typography variant="h6">{race} </Typography>
          </Breadcrumbs>
        </S.BreadcrumbsContainer>

        <S.StyledImageBox>
          <S.Titre variant="h1">{race}</S.Titre>
          {racedata !== undefined && racedata?.results?.length > 0 && (
            <S.Image
              srcSet={`${racedata?.results[0].lien}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
              src={`${racedata?.results[0].lien}?w=100&h=100&fit=crop&auto=format`}
              alt=""
              loading="lazy"
            />
          )}

          <S.ContainerTexte>texte</S.ContainerTexte>
          {!isLoadingSquelette &&
            squelettedata &&
            squelettedata?.results.length >= 2 && (
              <S.StyledImageScan
                image1={squelettedata?.results[1].lien}
                image2={squelettedata?.results[0].lien}
              />
            )}
        </S.StyledImageBox>
      </S.FlexContainer>
      <Button sx={{ height: "4vh", color: "secondary.main" }}>récré</Button>
    </S.MainContainer>
  );
};

export default Races;
