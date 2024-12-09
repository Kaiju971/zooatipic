import { useState } from "react";
import { Typography } from "@mui/material";

import * as S from "./lirePlus.styled";

const LongText: React.FC<{ text: string }> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded((prev) => !prev);

  return (
    <S.MainContainer>
      {!isExpanded ? (
        <>
          <S.TextContainer>
            <Typography variant="body1" color="white">
              {text}
            </Typography>
          </S.TextContainer>
          <S.VoirPlus onClick={toggleText}>Voir plus</S.VoirPlus>
        </>
      ) : (
        <S.FullText>
          <Typography variant="body1" color="white">
            {text}
          </Typography>

          <S.VoirPlus onClick={toggleText}>Voir moins</S.VoirPlus>
        </S.FullText>
      )}
    </S.MainContainer>
  );
};

export default LongText;
