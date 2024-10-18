import { Typography } from "@mui/material";
import Accordeon from "../../components/accordeon/accordeon";



import * as S from "./profil.styled";



const Profil: React.FC = () => {
  return (
    <S.MainContainer>
      <Typography variant="h1">PROFIL</Typography>
      <S.AccordeonContainer>
        <Accordeon />
      </S.AccordeonContainer>
    </S.MainContainer>
  );
};

export default Profil;
