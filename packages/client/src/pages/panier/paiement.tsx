import { useContext, useEffect, useState } from "react";
import { getBasket, getCommandeHead } from "../../utils/basket";
import { useMutation } from "@tanstack/react-query";
import {
  CommandesHead,
  CommandesReponse,
  CommandesRows,
} from "../../types/commandes";
import { fetchCommande } from "../../api/fetchers/commande";
import PrimaryButton from "../../components/buttonPrincipale";
import { useLocation } from "react-router";
import AuthContext from "../../store/auth/AuthContextProvider";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { Typography } from "@mui/material";

import * as S from "./panier.styled";

type CommandeData = {
  commande: CommandesHead;
  commandeRows: CommandesRows[];
};

const Paiement: React.FC = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [dataRowComande, setDataRowCommande] = useState<CommandesRows[]>();
  const [dataHeadComande, setDataHeadPanier] = useState<CommandesHead>();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const basket = getBasket();
    setDataRowCommande(basket);

    const commandeHead = getCommandeHead();
    setDataHeadPanier(commandeHead);
  }, []);

  const { mutate: saveCommande } = useMutation<
    CommandesReponse,
    AxiosError,
    CommandeData
  >({
    mutationFn: fetchCommande,
    onSuccess: (result) => {
      console.log(result);
    },
    onError: (error: AxiosError) => {
      console.error(error.response);
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message;
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    },
  });

  const CreateOrder = () => {
    if (authState.userId !== undefined && Number(authState.userId) > 0) {
      if (dataHeadComande) {
        const commandeData = {
          commande: dataHeadComande,
          commandeRows: dataRowComande ?? [],
        };
        saveCommande(commandeData);
      }
    } else
      enqueueSnackbar("Connectez-vous avec votre compte ou inscrivez-vous", {
        variant: "error",
      });
  };

  return (
    <S.MainContainer>
      <S.PageTitle variant="h1">PANIER</S.PageTitle>
      <S.BasketContainer>
        <S.Triangle />
        <S.Triangle2 />

        <S.ButtonContainer>
          <PrimaryButton
            label={
              <Typography variant="h6" textTransform="none">
                TEST COMMANDE
              </Typography>
            }
            colorVert
            onClick={() => CreateOrder()}
          />
        </S.ButtonContainer>
      </S.BasketContainer>
    </S.MainContainer>
  );
};

export default Paiement;
