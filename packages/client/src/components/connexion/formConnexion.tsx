import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Validate, ValidationGroup } from "mui-validate";
import React, { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router";
import imgBan from "../../images/LOGOABS-COUVERTURE.OFF.png";

import Loading from "../../shared/loading";
import * as S from "./formConnexion.styled";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const FormConnection: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const { onSubmit } = props;
  const [validationEmail, setValidationEmail] = useState({
    valid: false,
    messages: [],
    display: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [password, setPassword] = useState(""); // Définir l'état du mot de passe

  const validationForm = validationEmail.valid;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const addValidationForm = (event: React.FormEvent<HTMLFormElement>) => {
    if (validationForm) onSubmit(event);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value); // Mettre à jour le mot de passe lorsqu'il est modifié
  };

  return (
    <S.MainContainer2>
      <ValidationGroup>
        <>
          <Box
            component="form"
            sx={{
              width: "50%",
              marginLeft: "25%",
              marginTop: "5%",
              marginBottom: "5%",
              borderRadius: "5px",
              backgroundColor: "#00000012",
              "& .MuiTextField-root": {
                m: 1,
                width: { xs: "50vw", md: "25vw" },
                borderRadius: "10px",
                borderBlockColor: "secondary.main",
                backgroundColor: "secondary.main",
                boxShadow: " 0px 4px 4px gray inset",
              },
            }}
            noValidate
            autoComplete={"off"}
            onSubmit={addValidationForm}
          >
            <S.BoxForm2>
              <Typography
                variant="body1"
                color="primary.main"
                textAlign="center"
                paddingLeft="1.5rem"
              >
                Email :
              </Typography>
              <Validate
                name="email"
                regex={[
                  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  "Votre email n'est pas valide",
                ]}
                after={(result: any) => setValidationEmail(result)}
              >
                <S.ContainerEmail>
                  <TextField
                    required
                    id="email"
                    type="text"
                    placeholder="Entrez votre email..."
                    fullWidth
                    name="email"
                  />
                </S.ContainerEmail>
              </Validate>
              <Typography
                variant="body1"
                color="primary.main"
                textAlign="center"
                paddingLeft="1.5rem"
              >
                Mot de passe :
              </Typography>

              <FormControl
                sx={{
                  m: 1,
                  width: "50%",
                  borderRadius: "5px",
                  borderBlockColor: "secondary.main",
                  backgroundColor: "secondary.main",
                  boxShadow: " 0px 4px 4px gray inset",
                  "@media(max-width: 762px)": {
                    width: "90%",
                    marginLeft: "5%",
                  },
                }}
                variant="standard"
              >
                <FilledInput
                  id="filled-adornment-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Entrez votre mot de passe..."
                  name="password"
                  value={password} // Ajouter la valeur du mot de passe
                  onChange={handlePasswordChange} // Ajouter la fonction de gestion du changement de mot de passe
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <br />
              <br />
              <S.ButtonSubmit
                type="submit"
                variant="contained"
                color="secondary"
                disabled={validationForm ? false : true}
              >
                Se Connecter
              </S.ButtonSubmit>
              <hr style={{ border: "3px solid white" }} />
              <S.pTag>La page de connexion est réservée aux employés.</S.pTag>
              <hr
                style={{
                  width: "60%",
                  marginLeft: "20%",
                  border: "2px solid darkred",
                }}
              />
              <S.ContainerImage2
                src={imgBan}
                alt="logo"
                onClick={() => navigate("/")}
              />
              <Loading />
            </S.BoxForm2>
          </Box>
        </>
      </ValidationGroup>
    </S.MainContainer2>
  );
};

export default FormConnection;
