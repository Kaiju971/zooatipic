import { Box, Typography } from "@mui/material";
import React from "react";
import ContactMailIcon from '@mui/icons-material/ContactMail';

const AfterSubmit: React.FC = () => {
  return (
    <Box
        sx={{
          backgroundColor: "white",
          padding: "2rem",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="red" marginTop="11.5rem">
          Merci pour votre soumission !
        </Typography>
        <ContactMailIcon sx={{ width: '3rem', height: '3rem', color: 'red', marginTop: "1rem" }}/>
        <Typography variant="body1" color="red" marginTop="1rem">
          Nous avons bien reçu votre demande et nous vous remercions pour votre intérêt. Notre équipe traitera votre demande dans les plus brefs délais. N'hésitez pas à nous contacter si vous avez d'autres questions.
        </Typography>
      </Box>
  );
};

export default AfterSubmit;
