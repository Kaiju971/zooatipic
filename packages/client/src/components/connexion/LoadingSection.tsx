import React from "react";
import imgLoader from "../../images/ZOOAtipic.png";
import * as S from "./formConnexion.styled";

const LoadingSection: React.FC = () => {
  return (
    <>
      <S.MainContainer>
        <S.RotatingImage src={imgLoader} alt="Loading..." />
      </S.MainContainer>
    </>
  );
};

export default LoadingSection;
