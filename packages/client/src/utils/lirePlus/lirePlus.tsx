import React, { useEffect, useRef, useState } from "react";
import { Skeleton, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

import * as S from "./lirePlus.styled";

type Props = {
  textExpanded: string;
  rows?: number;
  variantTypography: Variant;
  loading?: boolean;
};

const LongText: React.FC<Props> = ({
  textExpanded,
  rows = 2,
  variantTypography,
  loading,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = textBoxRef.current;
    if (element) {
      setTimeout(() => {
        setIsOverflowing(element.scrollHeight > element.clientHeight);
      }, 1000);
    }
  }, []);

  const toggleExpand = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <S.MainContainer>
      <S.TextField ref={textBoxRef} isExpanded={isExpanded} rows={rows}>
        <Typography variant={variantTypography} align="center" color="primary">
          {loading ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} variant="text" animation="wave" />
              ))}
              <Skeleton animation="wave" width="10vw" sx={{ mt: "1vh" }} />
            </>
          ) : (
            textExpanded
          )}
        </Typography>
      </S.TextField>
      {isOverflowing && (
        <S.ButtonShowMore
          variant="text"
          color="secondary"
          onClick={toggleExpand}
        >
          <Typography variant={variantTypography}>
            {isExpanded ? "Voir moins" : "Voir plus"}
          </Typography>
        </S.ButtonShowMore>
      )}
    </S.MainContainer>
  );
};
export default LongText;
