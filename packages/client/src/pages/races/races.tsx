import React from "react";
import { Breadcrumbs, ImageListItem, Link, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { ProduitsWithPhoto } from "../../types/produits";
import { useParams } from "react-router";
import { fetchRaces } from "../../api/fetchers/races";

import * as S from "./races.styled";

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
    queryKey: ["photosproduitsbycategorie", raceId],
    queryFn: () => fetchRaces({ raceId: raceId ?? "" }),
    enabled: !!raceId,
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
        <Typography variant="h1">{race}</Typography>
        <S.StyledImageList cols={4}>
          {racedata !== undefined &&
            racedata?.results?.length > 0 &&
            racedata?.results?.map((item) => (
              <ImageListItem key={item.id}>
                <S.Image
                  srcSet={`${item.lien}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.lien}?w=100&h=100&fit=crop&auto=format`}
                  alt=""
                  loading="lazy"
                />
              </ImageListItem>
            ))}
        </S.StyledImageList>
      </S.StyledImageBox>
    </S.MainContainer>
  );
};

export default Races;
