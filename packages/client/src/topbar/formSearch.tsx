import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { AxiosError } from "axios";
import { Categorie } from "../../types/produits";

import * as S from "./topbar.styled";
import { Stack } from "@mui/system";
import { Routes } from "../../app/routes";
import { useNavigate } from "react-router";
import { MenuItem } from "@mui/base";
import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ComboBox() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    const fetchGetCategories = async () => {
      await axios
        .get(`categories`)
        .then((response) => {
          setCategories(response.data.results[0]);
          console.log("ici");
          console.log(response.data.results[0]);
        })
        .catch((error) => {
          const message = ((error as AxiosError).response?.data as any)
            ?.message as string;
          console.log(message || "Unknown Error");
        });
    };

    fetchGetCategories();
  }, []);

  const defaultProps = {
    options: categories,
    getOptionLabel: (option: Categorie) => option.categorie,
  };

  return (
   
    <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        onClick={(event) => {
          console.log("click");
          navigate(Routes.cartproduit, {
            state: {
              categorieId: (event.target as HTMLTextAreaElement).value,
            },
          });
        }}  
        id="disable-close-on-select"
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            label="disableCloseOnSelect"
            variant="standard"
          />
        )}
      />
    </Stack>
  );
}
