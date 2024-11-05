import { Typography } from "@mui/material";
import Accordeon from "../../components/accordion/accordeon";
import * as S from "./profil.styled";

const Profil: React.FC = () => {
  return (
    <S.MainContainer>
      <Typography variant="h1">BILLETS</Typography>
      <S.StyledAccordeon>
        <Accordeon />
      </S.StyledAccordeon>
    </S.MainContainer>
  );
};

export default Profil;
