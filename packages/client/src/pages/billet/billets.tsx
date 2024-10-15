import React from "react";
import { Articles } from "../../types/produits";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { fetchArticles } from "../../api/fetchers/articles";

import * as S from "./billets.styled";
import PrimaryButton from "../../components/buttonPrincipale";
import TicketBouton from "../../components/ticketBouton";
import { splitLineAtParenthesis } from "../../utils/utils";

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
          <S.TitleTicket variant="h5" color="primary">
            {groupes[0]}
          </S.TitleTicket>
          {articlesdata !== undefined &&
            articlesdata?.results.length > 0 &&
            articlesdata?.results
              .filter((el) => el.groupe_tickets === groupes[0])
              .map((item) => (
                <S.FlexBox>
                  {item.article.indexOf("(") === -1 ? (
                    <Typography variant="h6" color="primary">
                      {item.article}:
                    </Typography>
                  ) : (
                    <S.FlexBoxColumn>
                      <Typography variant="h5" color="primary">
                        {splitLineAtParenthesis(item.article)[0]}:
                      </Typography>

                      <Typography variant="body1" color="primary">
                        {splitLineAtParenthesis(item.article)[1]}
                      </Typography>
                    </S.FlexBoxColumn>
                  )}

                  <Typography variant="h6" color="primary">
                    {item.prix}€
                  </Typography>
                </S.FlexBox>
              ))}
          <S.StyledButton>
            <TicketBouton label="Acheter" />
          </S.StyledButton>
        </S.Ticket134>

        <S.Ticket25>
          <S.TitleTicket variant="h5">{groupes[1]}</S.TitleTicket>
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
          <S.TitleTicket variant="h5" color="primary">
            {groupes[2]}
          </S.TitleTicket>
          {articlesdata !== undefined &&
            articlesdata?.results.length > 0 &&
            articlesdata?.results
              .filter((el) => el.groupe_tickets === groupes[2])
              .map((item) => (
                <S.FlexBox>
                  {item.article.indexOf("(") === -1 ? (
                    <Typography variant="h6" color="primary">
                      {item.article}:
                    </Typography>
                  ) : (
                    <S.FlexBoxColumn>
                      <Typography variant="h5" color="primary">
                        {splitLineAtParenthesis(item.article)[0]}:
                      </Typography>

                      <Typography variant="body1" color="primary">
                        {splitLineAtParenthesis(item.article)[1]}
                      </Typography>
                    </S.FlexBoxColumn>
                  )}

                  <Typography variant="h6" color="primary">
                    {item.prix}€
                  </Typography>
                </S.FlexBox>
              ))}
          <S.StyledButton>
            <TicketBouton label="Acheter" />
          </S.StyledButton>
        </S.Ticket134>

        <S.TicketContainer>
          <S.Ticket4>
            {articlesdata !== undefined &&
              articlesdata?.results.length > 0 &&
              articlesdata?.results
                .filter((el) => el.groupe_tickets === groupes[3])
                .map((item) => (
                  <>
                    <S.TitleTicket variant="h6" color="primary">
                      {item.article}
                    </S.TitleTicket>
                    <Typography variant="h6" color="primary">
                      {item.prix}€
                    </Typography>
                  </>
                ))}
            <S.StyledButton>
              <TicketBouton label="Acheter" />
            </S.StyledButton>
          </S.Ticket4>

          <S.Ticket5>
            {articlesdata !== undefined &&
              articlesdata?.results.length > 0 &&
              articlesdata?.results
                .filter((el) => el.groupe_tickets === groupes[4])
                .map((item) => (
                  <>
                    <S.TitleTicket variant="h6">{item.article}</S.TitleTicket>
                    <Typography variant="h6">{item.prix}€</Typography>
                  </>
                ))}
            <S.StyledButton>
              <TicketBouton label="Acheter" />
            </S.StyledButton>
          </S.Ticket5>
        </S.TicketContainer>
      </S.GridContainer>
    </S.MainContainer>
  );
};

export default Billets;
