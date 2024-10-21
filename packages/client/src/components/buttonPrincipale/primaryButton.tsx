import React, { ReactNode } from "react";
import { ButtonProps } from "@mui/material/Button";
import Spinner from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import * as S from "./primaryButton.styled";

type Props = {
  label: ReactNode;
  isLoading?: boolean;
  colorVert?: boolean;
};

export const PrimaryButton: React.FC<ButtonProps & Props> = ({
  label,
  isLoading,
  colorVert,
  ...rest
}) => (
  <S.StyledButton {...rest} colorVert={colorVert}>
    <Typography variant="h5" component="span">
      {label}
    </Typography>
    {isLoading && <Spinner color="secondary" />}
  </S.StyledButton>
);

export default PrimaryButton;
