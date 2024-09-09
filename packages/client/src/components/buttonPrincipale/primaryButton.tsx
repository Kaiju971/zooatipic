import React from "react";
import { ButtonProps } from "@mui/material/Button";
import Spinner from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import * as S from "./primaryButton.styled";

type Props = {
  label: string;
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
