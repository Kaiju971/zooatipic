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
import { Box, Typography } from "@mui/material";
import { ValidationGroup } from "mui-validate";
import TextFieldValidated from "../../components/textFildValidated";
import Paypal from "../../images/paypal.png";
import IPay from "../../images/ipay.png";
import GPay from "../../images/gpay.png";

import * as S from "./panier.styled";

type CommandeData = {
  commande: CommandesHead;
  commandeRows: CommandesRows[];
};

const PayPal = () => {
  window.open(
    "https://www.paypal.com/webapps/mpp/paypal-popup",
    "WIPaypal",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700"
  );
  return false;
};

const Paiement: React.FC = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [dataRowComande, setDataRowCommande] = useState<CommandesRows[]>();
  const [dataHeadComande, setDataHeadPanier] = useState<CommandesHead>();
  const [formData, setFormData] = useState({
    nom: "",
    carte: "",
    codePostal: 0,
    ville: "",
  });

  const [validationNumero, setValidationNumero] = useState({
    valid: true,
    messages: [],
    display: true,
  });
  const [validationAdresse, setValidationAdresse] = useState({
    valid: true,
    messages: [],
    display: true,
  });
  const [validationCodePostal, setValidationCodePostal] = useState({
    valid: true,
    messages: [],
    display: true,
  });
  const [validationVille, setValidationVille] = useState({
    valid: true,
    messages: [],
    display: true,
  });

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
      console.log("Result from mutation:", result);
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
      <S.PaiementContainer>
        <S.Triangle3 />
        <Box
          component="form"
          sx={{
            width: "80%",
            "& > :not(style)": { m: 1 },
            "& .MuiFormControl-root": {
              width: "100%",
              "& .MuiInputLabel-shrink, .MuiInputLabel-root": {
                color: "textGris.main",
              },
            },
            " & .MuiOutlinedInput-root": {
              borderRadius: "12px",

              "& fieldset": {
                borderColor: "colorBackgroundForm.main",
                backgroundColor: "colorGris.main",
              },
              "&:hover fieldset": {
                borderColor: "colorBackgroundForm.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "colorBackgroundForm.main",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "colorBackgroundForm.main",
              },
            },

            " & .MuiInputBase-root": {
              borderColor: "colorGris.main",
              width: "100%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <ValidationGroup>
            <>
              <S.StyledTitreFildPaiement variant="body2">
                Card holder full name
              </S.StyledTitreFildPaiement>
              <TextFieldValidated
                nameField="name"
                conditionArray={[
                  [
                    (value) => {
                      return /^[A-Za-z0-9\-./,'\s]+$/.test(value);
                    },
                    "Vous ne pouvez mettre que des chiffres, des lettres, des tirets, des points, des slashes, des virgules, des apostrophes et des espaces",
                  ],
                ]}
                show
                setValidationField={setValidationNumero}
                label={"Enter your full name"}
              />
              <S.StyledTitreFildPaiement variant="body2">
                Card Number
              </S.StyledTitreFildPaiement>
              <TextFieldValidated
                nameField="carte"
                conditionArray={[
                  [
                    (value) => {
                      return /^[A-Za-z0-9\-./,'\s]+$/.test(value);
                    },
                    "Vous ne pouvez mettre que des chiffres, des lettres, des tirets, des points, des slashes, des virgules, des apostrophes et des espaces",
                  ],
                ]}
                show
                setValidationField={setValidationNumero}
                label={"0000 0000 0000 0000"}
              />
              <S.StyledTitreFildPaiement variant="body2">
                Expiry Date / CVV
              </S.StyledTitreFildPaiement>
              <S.FlexBoxBetween>
                <TextFieldValidated
                  nameField="date"
                  conditionArray={[
                    [
                      (value) => {
                        return /^[A-Za-z0-9\-./,'\s]+$/.test(value);
                      },
                      "Vous ne pouvez mettre que des chiffres, des lettres, des tirets, des points, des slashes, des virgules, des apostrophes et des espaces",
                    ],
                  ]}
                  show
                  setValidationField={setValidationNumero}
                  label={"01/23"}
                />
                <TextFieldValidated
                  nameField="cvv"
                  conditionArray={[
                    [
                      (value) => {
                        return /^[A-Za-z0-9\-./,'\s]+$/.test(value);
                      },
                      "Vous ne pouvez mettre que des chiffres, des lettres, des tirets, des points, des slashes, des virgules, des apostrophes et des espaces",
                    ],
                  ]}
                  show
                  setValidationField={setValidationNumero}
                />
              </S.FlexBoxBetween>
            </>
          </ValidationGroup>
          <PrimaryButton
            label={
              <Typography variant="h6" textTransform="none">
                Checkout
              </Typography>
            }
            onClick={() => CreateOrder()}
            sx={{ width: "100%", borderRadius: "12px" }}
          />
          <S.FlexBoxCentered sx={{ py: 4 }}>
            <S.Ligne />
            <Typography
              variant="h6"
              textTransform="none"
              sx={{ color: "textGris.main" }}
            >
              or pay using e-wallet
            </Typography>
            <S.Ligne />
          </S.FlexBoxCentered>

          <S.FlexBoxCentered>
            <PrimaryButton
              label={""}
              onClick={() => PayPal()}
              sx={{
                width: "31%",
                height: "6.5vh",
                background: `url(${Paypal})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "11px",
              }}
            />
            <PrimaryButton
              label={""}
              onClick={() => CreateOrder()}
              sx={{
                width: "31%",
                height: "6.5vh",
                background: `url(${IPay})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "11px",
              }}
            />
            <PrimaryButton
              label={""}
              onClick={() => CreateOrder()}
              sx={{
                width: "31%",
                height: "6.5vh",
                background: `url(${GPay})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "11px",
              }}
            />
          </S.FlexBoxCentered>
        </Box>
      </S.PaiementContainer>
    </S.MainContainer>
  );
};

export default Paiement;
