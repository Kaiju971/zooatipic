import * as S from "./banniere.styled";
import fon2 from "../../images/photo_2024-08-27_11-54-42(1).png";

const Banniere: React.FC = () => {
  return (
    <S.ImgContainer>
      <img src={fon2} alt="" width='100%'/>
    </S.ImgContainer>
  );
};

export default Banniere;
