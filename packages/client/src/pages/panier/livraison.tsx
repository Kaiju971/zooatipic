import PrimaryButton from "../../components/buttonPrincipale";
import { Box, FormControlLabel, RadioGroup, Typography } from "@mui/material";
import { ValidationGroup } from "mui-validate";
import TextFieldValidated from "../../components/textFildValidated";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Adresse } from "../../types/adresses";
import { fetchAdresses } from "../../api/fetchers/createAdresses";
import { useSnackbar } from "notistack";
import AuthContext from "../../store/auth/AuthContextProvider";
import { TVA } from "../../constants";
import {
  getNumberProducts,
  getTotalSum,
  saveCommandeHead,
} from "../../utils/basket";
import { User } from "../../types/users";
import { fetchUserBy } from "../../api/fetchers/getUser";

import * as S from "./panier.styled";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

const currentCommandeDate = `${day}/${month}/${year}`;

interface UserData {
  results: User[];
}

interface PanierProps {
  onNext: () => void;
}

const Livraison: React.FC<PanierProps> = ({ onNext }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [validationForm, setValidationForm] = useState(true);
  const [livraisonDom, setLivraisonDom] = useState(true);
  const [formData, setFormData] = useState({
    numero: "",
    adresse: "",
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

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserData>({
    queryKey: ["userby", authState.userId],
    queryFn: () => fetchUserBy({ userId: authState.userId ?? "" }),
    enabled: !!authState.userId,
    gcTime: 2000,
  });

  useEffect(() => {
    if (user && user.results) {
      setFormData({
        numero: user.results[0].numero.trim() || "",
        adresse: user.results[0].adresse.trim() || "",
        codePostal: Number(user.results[0].code_postal) || 0,
        ville: user.results[0].ville.trim() || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const formAdresse =
      validationCodePostal.valid &&
      validationAdresse.valid &&
      validationCodePostal.valid &&
      validationVille.valid;

    setValidationForm(Object.keys(formData).length !== 0 && !!formAdresse);
  }, [
    formData,
    validationAdresse.valid,
    validationCodePostal.valid,
    validationNumero,
    validationVille.valid,
  ]);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target?.name]: event.target?.value,
    }));
  };

  const { mutate: saveAddress } = useMutation<
    { results: { id: number }[] },
    AxiosError,
    Adresse
  >({
    mutationFn: fetchAdresses,
    onSuccess: (response) => {
      const adresseId = response.results[0].id;
      créerHeadCommande(adresseId, livraisonDom);
      onNext();
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (validationForm) {
      event.preventDefault();

      const form = event.target as HTMLFormElement;

      const deliveryMethodValue = (
        form.elements.namedItem("livraison_dom") as RadioNodeList
      ).value;
      setLivraisonDom(deliveryMethodValue === "domicile");

      if (
        formData.numero === user?.results[0].numero.trim() &&
        formData.adresse === user?.results[0].adresse.trim() &&
        formData.codePostal === Number(user?.results[0].code_postal) &&
        formData.ville === user?.results[0].ville.trim()
      ) {
        créerHeadCommande(user?.results[0].id_adresse, livraisonDom);
        onNext();
      } else {
        const DataAdresse = {
          ...formData,
          id_adresse_type: 2,
          livraison_dom: livraisonDom,
          id_adresse: user?.results[0].id_adresse,
        };

        saveAddress(DataAdresse);
      }
    } else
      enqueueSnackbar("Il faut remplir l'adresse", {
        variant: "error",
      });
  };

  const créerHeadCommande = (idAdresse: number, livraison_dom: boolean) => {
    const commande = {
      id_user: Number(authState.userId) ?? 0,
      date: currentCommandeDate,
      id_adresse: idAdresse,
      livraison_dom: livraison_dom,
      quantite: getNumberProducts(),
      somme: getTotalSum(),
      tva: getTotalSum() * TVA,
    };

    saveCommandeHead(commande);
  };

  if (isLoading || !user) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <S.MainContainer>
      <S.PageTitle variant="h1">PANIER</S.PageTitle>
      <S.BasketContainer>
        <S.Triangle />
        <S.Triangle2 />
        <Box
          component="form"
          sx={{
            width: "80%",
            "& > :not(style)": { m: 1 },
            "& .MuiFormControl-root": {
              width: "100%",
              "& .MuiInputLabel-shrink, .MuiInputLabel-root": {
                color: "#489f816c",
              },
            },
            "& .MuiOutlinedInput-root": {
              border: "solid 0.5px",
              borderColor: "#489f816c",
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <S.FlexBoxCentered>
            <RadioGroup
              row
              aria-labelledby="radio-buttons"
              name="livraison_dom"
              defaultValue="domicile"
              sx={{ width: "100%", justifyContent: "start" }}
            >
              <FormControlLabel
                value="domicile"
                control={<S.StyledRadio />}
                label="LIVRAISON A VOTRE DOMICILE"
                labelPlacement="start"
              />
              <FormControlLabel
                value="parc"
                control={<S.StyledRadio />}
                label="LIVRAISON AU PARC"
                labelPlacement="start"
              />
            </RadioGroup>
          </S.FlexBoxCentered>
          <S.DividerWithText>AUTRE OPTION</S.DividerWithText>

          <Typography variant="h6" textTransform="none">
            ADRESSE DE LIVRAISON DE VOTRE CHOIX (si différente de l’adresse
            indiquée sur votre profil)
          </Typography>
          <ValidationGroup>
            <S.FormContainer>
              <S.GridForm>
                <S.Sell1 variant="h6" textTransform="none">
                  Numéro:
                </S.Sell1>
                <S.Sell2>
                  <TextFieldValidated
                    nameField="numero"
                    conditionArray={[
                      [
                        (value) => {
                          if (formData.numero === user.results[0].numero) {
                            return true;
                          }
                          return /^[A-Za-z0-9\-./,'\s]+$/.test(value);
                        },
                        "Vous ne pouvez mettre que des chiffres, des lettres, des tirets, des points, des slashes, des virgules, des apostrophes et des espaces",
                      ],
                    ]}
                    show
                    setValidationField={setValidationNumero}
                    value={formData.numero}
                    setFieldValue={(e) => onInputChange(e)}
                    sx={{
                      backgroundColor: "colorGris.main",
                    }}
                  />
                </S.Sell2>
                <S.Sell3 variant="h6" textTransform="none">
                  Adresse:
                </S.Sell3>
                <S.Sell4>
                  <TextFieldValidated
                    nameField="adresse"
                    conditionArray={[
                      [
                        (value) => /^[a-zA-Z\-./,'\s]+$/.test(value),
                        "Vous ne pouvez mettre que des lettres majuscules et minuscules",
                      ],
                    ]}
                    show
                    setValidationField={setValidationAdresse}
                    value={formData.adresse}
                    setFieldValue={(e) => onInputChange(e)}
                    sx={{ backgroundColor: "colorGris.main" }}
                  />
                </S.Sell4>
                <S.Sell5 variant="h6" textTransform="none">
                  Code Postal:
                </S.Sell5>
                <S.Sell6>
                  <TextFieldValidated
                    nameField="codePostal"
                    conditionArray={[
                      [
                        (value) => {
                          if (
                            formData.codePostal === user.results[0].code_postal
                          ) {
                            return true;
                          }
                          return /^\d+$/.test(value);
                        },
                        "Vous ne pouvez mettre que des chiffres",
                      ],
                    ]}
                    show
                    setValidationField={setValidationCodePostal}
                    setFieldValue={(e) => onInputChange(e)}
                    value={formData.codePostal}
                    label={"code postal"}
                    sx={{ backgroundColor: "colorGris.main" }}
                  />
                </S.Sell6>
                <S.Sell7 variant="h6" textTransform="none">
                  Ville:
                </S.Sell7>
                <S.Sell8>
                  <TextFieldValidated
                    nameField="ville"
                    conditionArray={[
                      [
                        (value) => /^[a-zA-Z\s]+$/.test(value),
                        "Vous ne pouvez mettre que des lettres majuscules, minuscules et des espaces",
                      ],
                    ]}
                    show
                    setValidationField={setValidationVille}
                    value={formData.ville}
                    setFieldValue={(e) => onInputChange(e)}
                    sx={{ backgroundColor: "colorGris.main" }}
                  />
                </S.Sell8>
              </S.GridForm>
            </S.FormContainer>
          </ValidationGroup>

          <S.ButtonContainerLivraison disabled={!validationForm}>
            <PrimaryButton
              label={
                <Typography variant="h6" textTransform="none">
                  Valider ma livraison
                </Typography>
              }
              colorVert
              type="submit"
              disabled={!validationForm}
            />
          </S.ButtonContainerLivraison>
        </Box>
      </S.BasketContainer>
    </S.MainContainer>
  );
};

export default Livraison;
