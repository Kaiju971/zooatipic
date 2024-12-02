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
import IPay from "../../images/ipay.png";
import GooglePay from "./GooglePayButton";
import ButtonWrapper from "./payPal";

import * as S from "./panier.styled";

type CommandeData = {
  commande: CommandesHead;
  commandeRows: CommandesRows[];
};

const IPayHandler = () => {};

const Paiement: React.FC = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);

  const [validationForm, setValidationForm] = useState(false);
  const [dataRowComande, setDataRowCommande] = useState<CommandesRows[]>();
  const [dataHeadComande, setDataHeadPanier] = useState<CommandesHead>();
  const [formData, setFormData] = useState({
    nom: "",
    carte: "",
    date: "",
    code: "",
  });

  const [validationNom, setValidationNom] = useState({
    valid: true,
    messages: [],
    display: true,
  });
  const [validationCarte, setValidationCarte] = useState({
    valid: true,
    messages: [],
    display: true,
  });
  const [validationDate, setValidationDate] = useState({
    valid: true,
    messages: [],
    display: true,
  });
  const [validationCode, setValidationCode] = useState({
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

  useEffect(() => {
    const formAdresse =
      validationNom.valid &&
      validationCarte.valid &&
      validationDate.valid &&
      validationCode.valid;

    setValidationForm(Object.keys(formData).length !== 0 && !!formAdresse);
  }, [
    formData,
    validationNom.valid,
    validationCarte.valid,
    validationDate.valid,
    validationCode.valid,
  ]);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target?.name]: event.target?.value,
    }));
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = event.target.value.replace(/\D/g, ""); // Убираем все нецифровые символы
    if (input.length <= 16) {
      const formattedInput = input.match(/.{1,4}/g)?.join(" ") || ""; // Добавляем пробел после каждых 4 цифр
      setFormData((prev) => ({
        ...prev,
        carte: formattedInput,
      }));
    }
  };

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

  console.log(formData);

  return (
    <S.MainContainer>
      <S.PageTitle variant="h1">PANIER</S.PageTitle>
      <S.PaiementContainer>
        <S.Triangle3 />
        <Box
          component="form"
          sx={{
            width: "80%",
            color: "secondary.main",
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
                nameField="nom"
                conditionArray={[
                  [
                    (value) => /^[a-zA-Z\s]+$/.test(value),
                    "Vous ne pouvez mettre que des lettres majuscules, minuscules et des espaces",
                  ],
                ]}
                show
                value={formData.nom}
                setFieldValue={(e) => onInputChange(e)}
                setValidationField={setValidationNom}
                label={"Enter your full name"}
                sx={{ backgroundColor: "colorGris.main", borderRadius: "12px" }}
              />
              <S.StyledTitreFildPaiement variant="body2">
                Card Number
              </S.StyledTitreFildPaiement>
              <TextFieldValidated
                nameField="carte"
                conditionArray={[
                  [
                    (value) => {
                      return /^\d{4} \d{4} \d{4} \d{4}$/.test(value);
                    },
                    "Vous ne pouvez mettre que 16 chiffres séparés par des espaces tous les quatre",
                  ],
                ]}
                show
                value={formData.carte}
                setFieldValue={(e) => handleCardNumberChange(e)}
                setValidationField={setValidationCarte}
                label={"0000 0000 0000 0000"}
                sx={{ backgroundColor: "colorGris.main", borderRadius: "12px" }}
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
                        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
                      },
                      "Le mois doit être compris entre 01 et 12",
                    ],
                  ]}
                  show
                  value={formData.date}
                  setFieldValue={(e) => onInputChange(e)}
                  setValidationField={setValidationDate}
                  label={"MM/YY"}
                  sx={{
                    backgroundColor: "colorGris.main",
                    borderRadius: "12px",
                  }}
                />
                <TextFieldValidated
                  nameField="code"
                  conditionArray={[
                    [
                      (value) => {
                        return /^\d{3}$/.test(value);
                      },
                      "Vous ne pouvez mettre que trois chiffres",
                    ],
                  ]}
                  controled
                  show
                  value={formData.code}
                  setFieldValue={(e) => onInputChange(e)}
                  setValidationField={setValidationCode}
                  sx={{
                    backgroundColor: "colorGris.main",
                    borderRadius: "12px",
                  }}
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
            disabled={!validationForm}
            onClick={() => CreateOrder()}
            sx={{
              width: "100%",
              borderRadius: "12px",
              "&.Mui-disabled": {
                backgroundColor: "colorBackgroundForm1.main",
              },
            }}
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
            <ButtonWrapper />
            <PrimaryButton
              label={""}
              onClick={() => IPayHandler()}
              sx={{
                width: "31%",
                height: "6.5vh",
                background: `url(${IPay})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "11px",
              }}
            />

            <GooglePay />
          </S.FlexBoxCentered>
        </Box>
      </S.PaiementContainer>
    </S.MainContainer>
  );
};

export default Paiement;
