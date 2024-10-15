import React, { ReactNode } from "react";
import { ButtonProps } from "@mui/material/Button";
import Spinner from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import * as S from "./ticketBouton.styled";

type Props = {
  label: ReactNode;
  isLoading?: boolean;
};

export const PrimaryButton: React.FC<ButtonProps & Props> = ({
  label,
  isLoading,
  ...rest
}) => (
  <S.StyledButton {...rest}>
    <Typography variant="h5" component="span">
      {label}
    </Typography>
    {isLoading && <Spinner color="secondary" />}
  </S.StyledButton>
);

export default PrimaryButton;
