import { Box, TextField } from "@mui/material";
import PrimaryButton from "../buttonPrincipale";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth/AuthContextProvider";
import Rating from "@mui/material/Rating";
import { Avis, Sujets } from "../../types/avis";
import StarIcon from "@mui/icons-material/Star";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSujets } from "../../api/fetchers/sujets";
import { AxiosError } from "axios";
import { fetchAvis } from "../../api/fetchers/createAvis";
import { useSnackbar } from "notistack";

interface Label {
  [index: string]: string;
}

interface SujetsData {
  results: Sujets[];
}

const labels: Label = {
  0.5: "Je déconseille",
  1: "Je déconseille+",
  1.5: "Mauvais",
  2: "Mauvais+",
  2.5: "Moyen",
  3: "Moyen+",
  3.5: "Bien",
  4: "Bien+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const SetAvis: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [hover, setHover] = useState(-1);
  const [avis, setAvis] = useState<Avis>({
    message: "",
    note: 0,
    id_user: 0,
    id_sujet: 2,
  });

  const {
    data: sujetdata,
    isLoading,
    isError,
  } = useQuery<SujetsData>({
    queryKey: ["getsujets"],
    queryFn: () => fetchSujets(),
  });

  const { mutate: saveAvis } = useMutation<
    { results: { id: number }[] },
    AxiosError,
    Avis
  >({
    mutationFn: fetchAvis,
    onSuccess: (response) => {
      enqueueSnackbar("Votre avis a été enregistré", {
        variant: "success",
      });
      setAvis({
        message: "",
        note: 0,
        id_user: 0,
        id_sujet: 2,
      });
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

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setAvis({
      ...avis,
      [name]: name === "id_sujet" ? Number(value) : value,
    });
  };

  const addAvis = () => {
    avis.id_user = Number(authState.userId ?? 0);
    console.log(avis);
    saveAvis(avis);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="id_sujet"
        id="outlined-select-currency-native"
        select
        label=""
        defaultValue="2"
        SelectProps={{
          native: true,
        }}
        helperText="Choisissez un sujet"
        onChange={(e) => onInputChange(e)}
      >
        {sujetdata?.results?.flat().map((option) => (
          <option key={option.id} value={option.id}>
            {option.sujet}
          </option>
        ))}
      </TextField>

      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        placeholder="Ecrivez votre avis"
        fullWidth
        name="message"
        value={avis.message}
        onChange={(e) => onInputChange(e)}
        sx={{ width: { xs: "50vw", md: "25vw" } }}
        disabled={!authState.isLoggedIn}
      />

      <Rating
        name="note"
        size="large"
        value={avis.note}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) =>
          setAvis({ ...avis, note: newValue ?? 0 })
        }
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {avis.note !== null && (
        <Box sx={{ mt: 1 }}>{labels[hover !== -1 ? hover : avis.note]}</Box>
      )}
      <PrimaryButton label="Valider" onClick={addAvis} />
    </Box>
  );
};

export default SetAvis;
