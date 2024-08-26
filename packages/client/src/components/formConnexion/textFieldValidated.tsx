import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Validate } from "mui-validate";

import * as S from "./formConnexion.styled";

type Props = {
  nameField: string;
  label?: string;
  conditionArray?: [(value: string) => boolean, string][];
  controled?: boolean;
  show?: boolean;
  placeholder?: string;
  setValidationField: (result: any) => void;
  setFieldValue?: (value: string) => void;
};

const TextFieldValidated: React.FC<Props> = ({
  nameField,
  label,
  conditionArray,
  controled = false,
  show = false,
  placeholder,
  setValidationField,
  setFieldValue,
}) => {
  const [showField, setShowField] = useState(false);

  const handleClickShow = () => setShowField((showField) => !showField);
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setFieldValue) {
      setFieldValue(event.target.value);
    }
  };

  return (
    <S.MainContainer>
      {!controled ? (
        <S.TextFieldContainer show={show}>
          <Validate
            name={nameField}
            custom={conditionArray}
            after={(result: any) => setValidationField(result)}
          >
            <S.TextFieldBox>
              <S.StyledTextField
                required
                variant="outlined"
                id={nameField}
                type="text"
                placeholder={`Entrez votre ${nameField}...`}
                label={label ?? nameField}
                fullWidth
                name={nameField}
                onChange={handleFieldChange}
              />
            </S.TextFieldBox>
          </Validate>
        </S.TextFieldContainer>
      ) : (
        <S.TextFieldContainer show={show}>
          <Validate
            name={nameField}
            custom={conditionArray}
            after={(result: any) => setValidationField(result)}
          >
            <FormControl variant="outlined" required>
              <InputLabel>{label ?? nameField}</InputLabel>
              <S.StyledOutlinedInput
                type={showField ? "text" : "password"}
                autoComplete="new-password"
                placeholder={placeholder}
                name={nameField}
                onChange={handleFieldChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShow}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      {showField ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Validate>
        </S.TextFieldContainer>
      )}
    </S.MainContainer>
  );
};

export default TextFieldValidated;
