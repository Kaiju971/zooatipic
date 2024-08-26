import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { ValidationGroup } from "mui-validate";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";
import axios from "../../axios";
import { UserRoles } from "../../constants/roles";
import UpLoad from "../../images/UpLoad.png";
import img from "../../images/DevonRex.jpg";
import AuthContext from "../../store/auth/AuthContextProvider";
import { Roles } from "../../types/produits";
import * as S from "./connexion.styled";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const Connexion: React.FC<Props> = ({ onSubmit }) => {
  const [validationNom, setValidationNom] = useState({
    valid: false,
    messages: [],
    display: false,
  });
  const [validationPreNom, setValidationPreNom] = useState({
    valid: false,
    messages: [],
    display: false,
  });
  const [validationEmail, setValidationEmail] = useState({
    valid: false,
    messages: [],
    display: false,
  });

  const [passwordValue, setPasswordValue] = useState("");

  const [validationPassword, setValidationPassword] = useState<{
    valid: boolean;
    messages: string[];
    display: boolean;
  }>({
    valid: false,
    messages: [],
    display: false,
  });

  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState(UserRoles.VISITEUR);
  const [roles, setRoles] = useState<Roles[]>();
  const [dataUrl, setDataUrl] = useState(UpLoad);

  const currentPathArray = location.pathname.split("/");
  const page = currentPathArray[currentPathArray.length - 1];
  const userRole = authState.role;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value as UserRoles);
  };

  const validationForm =
    validationNom.valid &&
    validationPreNom.valid &&
    validationEmail.valid &&
    validationPassword.valid;

  const addValidationForm = (event: FormEvent<HTMLFormElement>) => {
    // Soumettre le formulaire si toutes les validations sont valides
    if (
      validationNom.valid &&
      validationPreNom.valid &&
      validationEmail.valid &&
      validationPassword.valid
    ) {
      onSubmit(event);
    }
  };

  useEffect(() => {
    const fetchGetRoles = async () => {
      try {
        const response = await axios.get(`roles`);
        setRoles(response.data.results[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGetRoles();
  }, []);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setDataUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const isLengthValid = (password: string) => password.length >= 12;
  const hasUpperCase = (password: string) => /[A-Z]/.test(password);
  const hasLowerCase = (password: string) => /[a-z]/.test(password);
  const hasSpecialChar = (password: string) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  useEffect(() => {
    const passwordValidations = [
      {
        condition: isLengthValid(passwordValue),
        message: "au moins 12 caractères",
      },
      {
        condition: hasUpperCase(passwordValue),
        message: "au moins une majuscule",
      },
      {
        condition: hasLowerCase(passwordValue),
        message: "au moins une minuscule",
      },
      {
        condition: hasSpecialChar(passwordValue),
        message: "au moins un caractère spécial",
      },
    ];

    const invalidMessages = passwordValidations
      .filter((validation) => !validation.condition)
      .map((validation) => validation.message);

    setValidationPassword({
      valid: invalidMessages.length === 0,
      messages: invalidMessages,
      display: true, // Afficher les messages d'erreur
    });
  }, [passwordValue]);

  return (
    <S.MainContainer>
      <ValidationGroup>
        <Box
          component="form"
          onSubmit={addValidationForm}
          sx={{ height: "auto" }}
        >
          <input type="hidden" name="page" value={page} />
          <S.FlexBox>
            <S.ImgContainer>
              <S.Img src={img} alt="" />
              <S.StyledAvatar alt="user avatar" src={dataUrl} />
              <S.StyledInput
                type="file"
                onChange={handleUpload}
                name="avatar"
              />
              <Typography
                variant="h2"
                sx={{
                  pt: { sm: 3, md: 6 },
                  color: "primary.main",
                  fontWeight: "900",
                  gridRow: "2",
                  gridColumn: "1",
                }}
              >
                Choisissez un avatar
              </Typography>
            </S.ImgContainer>
            <S.StyledBox>
              <S.FlexBoxTitle>
                <Typography noWrap variant="body1" textAlign="center">
                  Nom :
                </Typography>
                <Typography noWrap variant="body1" textAlign="center">
                  Prénom :
                </Typography>
              </S.FlexBoxTitle>
              <S.FlexBoxMain>
                <S.Title>
                  <Typography variant="body1" textAlign="center">
                    Nom :
                  </Typography>
                </S.Title>
                <TextField
                  required
                  type="text"
                  placeholder="Entrez votre nom..."
                  sx={{
                    width: { xs: "60vw", md: "15vw" },
                    backgroundColor: "secondary.main",
                  }}
                  name="nom"
                  onChange={(event) =>
                    setValidationNom({
                      valid: !!event.target.value,
                      messages: [],
                      display: false,
                    })
                  }
                />
                <S.Title>
                  <Typography noWrap variant="body1" textAlign="center">
                    Prénom :
                  </Typography>
                </S.Title>
                <TextField
                  required
                  type="text"
                  placeholder="Entrez votre prénom.."
                  sx={{
                    width: { xs: "60vw", md: "15vw" },
                    textAlign: "center",
                    backgroundColor: "secondary.main",
                  }}
                  name="prenom"
                  onChange={(event) =>
                    setValidationPreNom({
                      valid: !!event.target.value,
                      messages: [],
                      display: false,
                    })
                  }
                />
              </S.FlexBoxMain>
              <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <S.FlexBoxTitle>
                <Typography variant="body1" textAlign="center">
                  Role :
                </Typography>
                <Typography variant="body1" textAlign="center">
                  Email :
                </Typography>
              </S.FlexBoxTitle>
              <S.FlexBoxMain>
                <S.Title>
                  <Typography noWrap variant="body1" textAlign="center">
                    Role :
                  </Typography>
                </S.Title>
                <TextField
                  id="outlined-select-role"
                  select
                  label="Select"
                  name="role"
                  value={selectedRole ? selectedRole : UserRoles.VISITEUR}
                  defaultValue={UserRoles.VISITEUR}
                  sx={{
                    width: { xs: "60vw", md: "15vw" },
                    textAlign: "center",
                    backgroundColor: "secondary.main",
                    mb: 2,
                  }}
                  disabled={userRole !== UserRoles.ADMINISTRATEUR}
                  onChange={handleChange}
                >
                  {roles?.map((item, index) => (
                    <MenuItem key={index} value={item.role}>
                      {item.role}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  type="text"
                  placeholder="Entrez votre email..."
                  sx={{
                    width: { xs: "60vw", md: "15vw" },
                    textAlign: "center",
                    backgroundColor: "secondary.main",
                    mb: 2,
                  }}
                  name="email"
                  onChange={(event) =>
                    setValidationEmail({
                      valid: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        event.target.value
                      ),
                      messages: [],
                      display: false,
                    })
                  }
                />
              </S.FlexBoxMain>
              <Typography variant="body1" textAlign="center">
                Mot de passe :
              </Typography>
              <TextField
                required
                type="password"
                placeholder="Entrez votre mot de passe..."
                sx={{
                  width: { xs: "60vw", md: "36vw" },
                  textAlign: "center",
                  backgroundColor: "secondary.main",
                }}
                name="password"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
                autoComplete="new-password"
              />
              {/* Affichage des messages de validation du mot de passe */}
              <S.FlexContainer>
                {validationPassword.display && (
                  <Box>
                    {validationPassword.messages.map((message, index) => (
                      <Typography key={index} variant="body1" color="red">
                        {message}
                      </Typography>
                    ))}
                  </Box>
                )}

                <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <S.ButtonSubmit
                  type="submit"
                  disabled={!validationForm}
                  color="primary"
                >
                  Submit
                </S.ButtonSubmit>
              </S.FlexContainer>
            </S.StyledBox>
          </S.FlexBox>
        </Box>
      </ValidationGroup>
    </S.MainContainer>
  );
};

export default Connexion;
