import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import Switch from "../darkandlightmode";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as S from "./accordeon.styled";
import { TextField } from "@mui/material";

const Accordeon: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <S.MainContainer>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            background:
              "linear-gradient(0deg, #FFC700 30%, #CC9F00 60%, #997700 100%)",
          }}
        >
          Choisir son avatar
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: "rgba(198, 186, 147, 0.5)",
          }}
        >
          <S.Button>
            <S.Icon
              id="UploadToCloud"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              width="16px"
            >
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path
                fill="#000000"
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z"
              ></path>
            </S.Icon>
            Upload CV
          </S.Button>
          <PublishIcon />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            background:
              "linear-gradient(0deg, #FFC700 30%, #CC9F00 60%, #997700 100%)",
          }}
        >
          Coordonnées
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: "rgba(198, 186, 147, 0.5)",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            background:
              "linear-gradient(0deg, #FFC700 30%, #CC9F00 60%, #997700 100%)",
          }}
        >
          Historique des commandes
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: "rgba(198, 186, 147, 0.5)",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
          sx={{
            background:
              "linear-gradient(0deg, #FFC700 30%, #CC9F00 60%, #997700 100%)",
          }}
        >
          Modifier mon mot de passe
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: "rgba(198, 186, 147, 0.5)",
          }}
        >
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "15%" } }}
            noValidate
            autoComplete="off"
            display="flex"
            marginLeft="0%"
          >
            <TextField
              id="standard-basic"
              label="Numéro de rue"
              variant="standard"
              InputLabelProps={{
                sx: {
                  color: "orange", // Couleur du label
                  "&.Mui-focused": {
                    color: "orange", // Couleur du label lorsque l'input est en focus
                  },
                },
              }}
              InputProps={{
                sx: {
                  color: "black", // Couleur du texte saisi
                  "&::before": {
                    borderBottom: "1px solid orange", // Couleur de la ligne avant focus
                  },
                  "&:hover:not(.Mui-disabled)::before": {
                    borderBottom: "2px solid orange", // Couleur de la ligne au survol
                  },
                  "&.Mui-focused::after": {
                    borderBottom: "2px solid orange", // Couleur de la ligne après focus
                  },
                },
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header"
          sx={{
            background:
              "linear-gradient(0deg, #FFC700 30%, #CC9F00 60%, #997700 100%)",
          }}
        >
          Préférences du profil
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: "rgba(198, 186, 147, 0.5)",
            borderColor: "7A6E41",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <Switch />
      </Accordion>
      <Button
        variant="contained"
        disableElevation
        sx={{
          color: "grey",
          backgroundColor: "black",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px black",
          "&:hover": {
            backgroundColor: "#333333", // Changer la couleur de fond au survol
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.8)", // Augmenter l'intensité de l'ombre
            color: "white", // Changer la couleur du texte au survol
          },
        }}
      >
        MODIFIER LE PROFIL
      </Button>

      <Button
        variant="contained"
        disableElevation
        sx={{
          color: "white",
          backgroundColor: "#23F800",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px #489F80",
          "&:hover": {
            backgroundColor: "#1DB600", // Changer la couleur de fond au survol
            boxShadow: "0px 6px 15px rgba(72, 159, 128, 0.8)", // Augmenter l'intensité de l'ombre
            color: "lightgrey", // Changer la couleur du texte au survol
          },
        }}
      >
        ENREGISTRER LES MODIFICATIONS
      </Button>
    </S.MainContainer>
  );
};

export default Accordeon;
