import React, { useState } from "react";
import { Articles } from "../../types/produits";
import { useQuery } from "@tanstack/react-query";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
} from "@mui/material";
import { fetchArticles } from "../../api/fetchers/articles";
import PrimaryButton from "../../components/buttonPrincipale";
import { splitLineAtParenthesis } from "../../utils/utils";
import Calendrier from "../../components/calendrier";

import * as S from "./billets.styled";
import { addBasket } from "../../utils/basket";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

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
  const [checked, setChecked] = useState<boolean[]>([]);
  const [basket, setBasket] = useState<Articles[]>([]);

  const {
    data: articlesdata,
    isLoading,
    isError,
  } = useQuery<ProductsData>({
    queryKey: ["ticketarticles"],
    queryFn: () => fetchArticles({ categorieVentes: "ticket" }),
  });
  const handleClickOpen = () => {
    setOpen(true); // Ouvrir la modale
  };

  const handleClose = () => {
    setOpen(false); // Fermer la modale
  };

  const handleCheckboxChange =
    (index: number, item: Articles) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedChecked = [...checked];
      updatedChecked[index] = event.target.checked;
      setChecked(updatedChecked);

      if (event.target.checked) {
        setBasket((prevBasket) => [...prevBasket, item]);
      } else {
        setBasket((prevBasket) =>
          prevBasket.filter((basketItem) => basketItem.id !== item.id)
        );
      }
    };

  const handleBuyClick = (article?: Articles) => {
    // Logique d'achat, puis ouvrir le calendrier

    if (basket && basket.length > 0)
      basket.map((item) =>
        addBasket({
          id_article: item.id,
          prix: item.prix,
          quantite: 1,
          article: item.article,
          photo: "",
          stock: 1,
          date_visite: "",
        })
      );

    if (article)
      addBasket({
        id_article: article?.id ?? -1,
        prix: article?.prix ?? 0,
        quantite: 1,
        article: article?.article ?? "",
        photo: "",
        stock: 1,
        date_visite: "",
      });
    // handleClickOpen(); // Ouvrir la modale après l'ajout au panier
  };

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
              .map((item, index) => (
                <S.FlexBox key={item.id}>
                  <FormGroup sx={{ width: "100%" }}>
                    <FormControlLabel
                      labelPlacement="end"
                      sx={{ width: "100%", mr: "0" }}
                      control={
                        <Checkbox
                          defaultChecked
                          sx={{
                            color: "black",
                            "&.Mui-checked": {
                              color: "gold",
                            },
                          }}
                          checked={checked[index] || false}
                          onChange={handleCheckboxChange(index, item)}
                        />
                      }
                      label={
                        <S.FlexBox sx={{ width: "100%" }}>
                          {item.article.indexOf("(") === -1 ? (
                            <Typography variant="h6" color="primary">
                              {item.article}
                            </Typography>
                          ) : (
                            <S.FlexBoxColumn>
                              <Typography variant="h5" color="primary">
                                {splitLineAtParenthesis(item.article)[0]}
                              </Typography>
                              <Typography variant="body1" color="primary">
                                {splitLineAtParenthesis(item.article)[1]}
                              </Typography>
                            </S.FlexBoxColumn>
                          )}

                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ display: "inline-block" }}
                          >
                            {item.prix}€
                          </Typography>
                        </S.FlexBox>
                      }
                      componentsProps={{
                        typography: {
                          sx: {
                            width: "100%",
                          },
                        },
                      }}
                    />
                  </FormGroup>
                </S.FlexBox>
              ))}
          <S.StyledButton>
            <PrimaryButton
              label="Acheter"
              mode="ticket"
              onClick={() => handleBuyClick()}
            />
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
                <S.FlexBox key={item.id}>
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
                    <PrimaryButton
                      label="Acheter"
                      mode="ticket"
                      onClick={() => handleBuyClick(item)}
                    />
                  </S.StyledButton>
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
                      <PrimaryButton
                        label="Acheter"
                        mode="ticket"
                        onClick={() => handleBuyClick(item)}
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
                      <PrimaryButton
                        label="Acheter"
                        mode="ticket"
                        onClick={() => handleBuyClick(item)}
                      />
                    </S.StyledButton>
                  </>
                ))}
          </S.Ticket5>
        </S.TicketContainer>
        {/* Modale pour le calendrier */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Sélectionnez une date</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Calendrier />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleClose} color="primary">
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </S.GridContainer>
    </S.MainContainer>
  );
};

export default Billets;
