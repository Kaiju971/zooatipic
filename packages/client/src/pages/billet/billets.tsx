import React, { useState } from "react";
import { Articles } from "../../types/produits";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { fetchArticles } from "../../api/fetchers/articles";
import TicketBouton from "../../components/ticketBouton";
import { splitLineAtParenthesis } from "../../utils/utils";
import Calendrier from "../../components/calendrier";
import { addBasket, addPropertyToBasket } from "../../utils/basket";
import Checkbox from "@mui/material/Checkbox";

import * as S from "./billets.styled";

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
  const [open, setOpen] = useState(false); // État pour contrôler l'ouverture de la modale
  const [dateValue, setDateValue] = useState<string>("");
  const [idTickets, setIdTickets] = useState<number[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<Articles[]>([]);

  // Fonction de gestion de la sélection
  const handleCheckboxChange = (article: Articles) => {
    setSelectedArticles(
      (prev) =>
        prev.some((a) => a.id === article.id)
          ? prev.filter((a) => a.id !== article.id) // Supprime si déjà sélectionné
          : [...prev, article] // Ajoute si non sélectionné
    );
  };

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

  const handleClickOpen = () => {
    setOpen(true); // Ouvrir la modale
  };

  const handleClose = (): void => {
    setOpen(false); // Fermer la modale
  };

  const handleBuyClick = (items: Articles[]): void => {
    handleClickOpen(); // Ouvre la modale après l'ajout au panier

    items.forEach((item: Articles) => {
      setIdTickets((idTicket) => [...idTicket, item.id]);
      addBasket({
        id_article: item.id,
        prix: item.prix,
        quantite: 1,
        article: item.article,
        photo: "",
        stock: 1,
        date_visite: "",
        categorie_ventes: "ticket",
      });
    });
  };

  const handleConfirmed = () => {
    idTickets.forEach((idTicket) =>
      addPropertyToBasket(idTicket, "date_visite", dateValue)
    );

    setOpen(false);
  };
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
                <S.FlexBox key={item.id}>
                  <Checkbox
                    checked={selectedArticles.some((a) => a.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                  />
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
                  <S.StyledButton>
                    <TicketBouton
                      label="Acheter"
                      onClick={() => handleBuyClick(selectedArticles)}
                    />
                  </S.StyledButton>
                </S.FlexBox>
              ))}
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
                      <S.StyledButton>
                        <TicketBouton
                          label="Acheter"
                          onClick={() => {
                            handleCheckboxChange(item);
                            handleBuyClick(selectedArticles);
                          }}
                        />
                      </S.StyledButton>
                    </S.FlexBoxColumn>
                  )}

                  <Typography variant="h6" color="primary">
                    {item.prix}€
                  </Typography>
                </S.FlexBox>
              ))}
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
                    <S.StyledButton>
                      <TicketBouton
                        label="Acheter"
                        onClick={() => {
                          handleCheckboxChange(item);
                          handleBuyClick(selectedArticles);
                        }}
                      />
                    </S.StyledButton>
                  </>
                ))}
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

                    <S.StyledButton>
                      <TicketBouton
                        label="Acheter"
                        onClick={() => {
                          handleCheckboxChange(item);
                          handleBuyClick(selectedArticles);
                        }}
                      />
                    </S.StyledButton>
                  </>
                ))}
          </S.Ticket5>
        </S.TicketContainer>
      </S.GridContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sélectionnez une date</DialogTitle>
        <DialogContent>
          <Calendrier setDataValue={setDateValue} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleConfirmed} color="secondary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </S.MainContainer>
  );
};

export default Billets;
