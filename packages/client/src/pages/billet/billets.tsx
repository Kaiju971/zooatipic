import React from "react";
import { Articles } from "../../types/produits";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { fetchArticles } from "../../api/fetchers/articles";

import * as S from "./billets.styled";
import PrimaryButton from "../../components/buttonPrincipale";
import TicketBouton from "../../components/ticketBouton";

const groupes = [
  "Billet 1 journée",
  "Billet groupe + de 5 personnes",
  "Billet 1 journée groupe",
  "Billet 1 nuit et 1 jour COTTAGES",
  "Billet BALADE SOUS MARINE",
];

interface ProductsData {
  results: Articles[];
}

const Billets: React.FC = () => {
  const {
    data: articlesdata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["ticketarticles"],
    queryFn: () => fetchArticles({ categorieVentes: "ticket" }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <S.MainContainer>
      <S.Title>
        <Typography variant="h1">BILLETS</Typography>
        <Typography variant="body2">NOS BILLETS exclusivité Web</Typography>
      </S.Title>

      <S.GridContainer>
        <S.Ticket134>
          <Typography variant="h5" color="primary">
            {groupes[0]}
          </Typography>
          {articlesdata !== undefined &&
            articlesdata?.results.length > 0 &&
            articlesdata?.results
              .filter((el) => el.groupe_tickets === groupes[0])
              .map((item) => (
                <>
                  <Typography variant="h6" color="primary">
                    {item.article} :
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {item.prix}€
                  </Typography>
                </>
              ))}
        </S.Ticket134>
        <S.ButtonContainer1>
          <TicketBouton label="Acheter" />
        </S.ButtonContainer1>
        <S.Ticket25>
          <Typography variant="h5">{groupes[1]}</Typography>
          <>
            <Typography variant="body1">
              Contactez-nous pour toutes modalitées personnelles.
            </Typography>

            <S.TypographyStyled variant="body1">
              billetterie@zooatipic.net
            </S.TypographyStyled>
          </>
        </S.Ticket25>
        <S.Ticket134>
          <Typography variant="h5" color="primary">
            {groupes[2]}
          </Typography>
          {articlesdata !== undefined &&
            articlesdata?.results.length > 0 &&
            articlesdata?.results
              .filter((el) => el.groupe_tickets === groupes[2])
              .map((item) => (
                <>
                  <Typography variant="h6" color="primary">
                    {item.article}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {item.prix}€
                  </Typography>
                </>
              ))}
        </S.Ticket134>
        <S.ButtonContainer2>
          <TicketBouton label="Acheter" />
        </S.ButtonContainer2>
        <S.TicketContainer>
          <S.Ticket4>
            {articlesdata !== undefined &&
              articlesdata?.results.length > 0 &&
              articlesdata?.results
                .filter((el) => el.groupe_tickets === groupes[3])
                .map((item) => (
                  <>
                    <Typography variant="h6" color="primary">
                      {item.article}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {item.prix}€
                    </Typography>
                  </>
                ))}
          </S.Ticket4>
          <S.ButtonContainer3>
            <TicketBouton label="Acheter" />
          </S.ButtonContainer3>
          <S.Ticket5>
            {articlesdata !== undefined &&
              articlesdata?.results.length > 0 &&
              articlesdata?.results
                .filter((el) => el.groupe_tickets === groupes[4])
                .map((item) => (
                  <>
                    <Typography variant="h6">{item.article}</Typography>
                    <Typography variant="h6">{item.prix}€</Typography>
                  </>
                ))}
          </S.Ticket5>
          <S.ButtonContainer4>
            <TicketBouton label="Acheter" />
          </S.ButtonContainer4>
        </S.TicketContainer>
      </S.GridContainer>
    </S.MainContainer>
  );
};

export default Billets;
