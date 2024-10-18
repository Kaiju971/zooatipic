import React, { ReactNode } from "react";
import { ButtonProps } from "@mui/material/Button";
import Spinner from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import * as S from "./primaryButton.styled";

type Props = {
  label: ReactNode;
  isLoading?: boolean;
  mode?: string;
};

export const PrimaryButton: React.FC<ButtonProps & Props> = ({
  label,
  isLoading,
  mode,
  ...rest
}) => (
  <S.StyledButton mode={mode ?? ""} {...rest}>
    <Typography variant="h5" component="span">
      {label}
    </Typography>
    {isLoading && <Spinner color="secondary" />}
  </S.StyledButton>
);

export default PrimaryButton;
