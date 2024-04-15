import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AfterSubmit from "./afterSubmit";

const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("mrgnkyed");
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    societe: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    prenom: "",
    nom: "",
    societe: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Appliquer la validation ici pour le champ "prenom"
    if (name === "prenom" || name === "nom") {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          /^[A-Za-z]+$/.test(value) || value === ""
            ? ""
            : `Le champ ${name} doit contenir uniquement des lettres.`,
      }));
    }

    // Mettre à jour les données du formulaire
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isButtonDisabled =
    state.submitting || // Désactiver pendant la soumission
    Object.values(formData).some((value) => value === "") || // Désactiver si un champ est vide
    Object.values(validationErrors).some((error) => error !== "");

  if (state.succeeded) {
    return <AfterSubmit />;
  }

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, rgba(228, 107, 107, 0.345) 28%, rgba(164, 8, 8, 0.634) 100%)`,
        padding: "2rem",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" color="white" marginTop="2.5rem">
          Formulaire de Devis
        </Typography>

        {/* Input Prénom */}
        <TextField
          sx={{
            width: "90%",
            marginTop: "1.5rem",
            backgroundColor: "white",
          }}
          id="filled-size-small prenom"
          label="Prénom"
          name="prenom"
          type="text"
          size="small"
          variant="filled"
          value={formData.prenom}
          onChange={handleInputChange}
        />
        <ValidationError
          prefix="Prenom"
          field="prenom"
          errors={state.errors}
          style={{ color: "red" }}
        />
        {validationErrors.prenom && (
          <Typography
            color="red"
            variant="caption"
            sx={{
              marginTop: "0.5rem",
              display: "block",
              backgroundColor: "transparent",
            }}
          >
            {validationErrors.prenom}
          </Typography>
        )}

        {/* Input Nom */}
        <TextField
          sx={{
            width: "90%",
            marginTop: "1.5rem",
            backgroundColor: "white",
          }}
          id="filled-size-small nom"
          label="Nom"
          name="nom"
          type="text"
          size="small"
          variant="filled"
          value={formData.nom}
          onChange={handleInputChange}
        />
        <ValidationError
          prefix="Nom"
          field="nom"
          errors={state.errors}
          style={{ color: "red" }}
        />
        {validationErrors.nom && (
          <Typography
            color="red"
            variant="caption"
            sx={{
              marginTop: "0.5rem",
              display: "block",
              backgroundColor: "transparent",
            }}
          >
            {validationErrors.nom}
          </Typography>
        )}

        {/* Input Société */}
        <TextField
          sx={{
            width: "90%",
            marginTop: "1.5rem",
            backgroundColor: "white",
          }}
          id="filled-size-small societe"
          label="Société"
          name="societe"
          type="text"
          size="small"
          variant="filled"
          value={formData.societe}
          onChange={handleInputChange}
        />

        {/* Input Message TextArea */}
        <TextField
          sx={{
            width: "90%",
            marginTop: "1.2rem",
            backgroundColor: "white",
          }}
          id="filled-multiline-static message"
          label="Message"
          name="message"
          multiline
          rows={4}
          variant="filled"
          value={formData.message}
          onChange={handleInputChange}
        />

        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            marginTop: "2rem",
            color: "white",
          }}
        >
          <Button
            type="submit"
            disabled={isButtonDisabled}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white", // Couleur de la bordure
              "&:hover": {
                backgroundColor: "white",
                color: "black", // Couleur du texte au survol
              },
            }}
          >
            Soumettre
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ContactForm;
