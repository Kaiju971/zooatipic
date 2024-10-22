import React, { FormEventHandler, useState } from "react";
import { Typography } from "@mui/material";
import TextFieldValidated from "../textFildValidated";
import { ValidationGroup } from "mui-validate";

import * as S from "./formConnexion.styled";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const FormConnection: React.FC<Props> = (props: Props) => {
  const { onSubmit } = props;
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [validationNom, setValidationNom] = useState({
    valid: false,
    messages: [],
    display: false,
  });
  const [validationPrenom, setValidationPrenom] = useState({
    valid: false,
    messages: [],
    display: false,
  });
  const [validationEmail, setValidationEmail] = useState({
    valid: false,
    messages: [],
    display: false,
  });
  const [validationPassword, setValidationPassword] = useState({
    valid: false,
    messages: [],
    display: true,
  });
  const [validationPasswordConf, setValidationPasswordConf] = useState({
    valid: false,
    messages: [],
    display: true,
  });

  const validationForm =
    validationEmail.valid &&
    validationPassword.valid &&
    (!show ||
      (validationNom.valid &&
        validationPrenom.valid &&
        validationPasswordConf.valid));

  const addValidationForm = (event: React.FormEvent<HTMLFormElement>) => {
    if (validationForm) onSubmit(event);
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target?.value);
  };

  return (
    <ValidationGroup>
      <>
        <S.StyledBox
          noValidate
          autoComplete={"off"}
          show={show}
          onSubmit={addValidationForm}
        >
          <S.BoxTitle>
            <Typography variant="h1" textAlign="center" paddingLeft="1.5rem">
              {show ? "INSCRIPTION" : "CONNEXION"}
            </Typography>
          </S.BoxTitle>
          <S.FlexBox>
            <TextFieldValidated
              nameField="nom"
              conditionArray={[
                [
                  (value) => /^[a-zA-Z]+$/.test(value),
                  "Vous ne pouvez mettre que des lettres majuscules et minuscules",
                ],
              ]}
              show={show}
              setValidationField={setValidationNom}
            />
            <TextFieldValidated
              nameField="prenom"
              conditionArray={[
                [
                  (value) => /^[a-zA-Z]+$/.test(value),
                  "Vous ne pouvez mettre que des lettres majuscules et minuscules",
                ],
              ]}
              show={show}
              setValidationField={setValidationPrenom}
            />
            <TextFieldValidated
              nameField="email"
              conditionArray={[
                [
                  (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
                  "Votre email n'est pas valide",
                ],
              ]}
              show={true}
              setValidationField={setValidationEmail}
            />
            <TextFieldValidated
              nameField="password"
              label="mot de passe"
              conditionArray={[
                [
                  (value: string) => /[A-Z]/.test(value),
                  "Au moins une majuscule",
                ],
                [
                  (value: string) => /[a-z]/.test(value),
                  "Au moins une minuscule",
                ],
                [
                  (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
                  "Au moins un caractère spécial",
                ],
                [
                  (value: string) => value.length >= 12,
                  "Au moins 12 caractères",
                ],
              ]}
              controled
              show={true}
              setValidationField={setValidationPassword}
              setFieldValue={onInputChange}
            />
            <TextFieldValidated
              nameField="passwordConf"
              label="mot de passe confirmation"
              conditionArray={[
                [
                  (value) =>
                    validationPassword &&
                    value.length > 0 &&
                    value === password,
                  "Le mot de passe ne correspond pas",
                ],
              ]}
              controled
              show={show}
              placeholder="Confirmez votre mot de passe..."
              setValidationField={setValidationPasswordConf}
            />
          </S.FlexBox>
          <br />
          <br />
          <S.Buttons>
            <S.ButtonSubmit
              type="submit"
              variant="contained"
              disabled={!validationForm}
            >
              <Typography variant="h2">
                {show ? "Valider" : "Se connecter"}
              </Typography>
            </S.ButtonSubmit>
          </S.Buttons>
          <hr style={{ border: "3px solid white" }} />
          <S.PTag variant="h5" onClick={() => setShow(!show)}>
            {show
              ? "Connectez-vous"
              : "Vous n'êtes pas encore inscrit ? Inscrivez-vous !"}
          </S.PTag>
        </S.StyledBox>
      </>
    </ValidationGroup>
  );
};

export default FormConnection;
