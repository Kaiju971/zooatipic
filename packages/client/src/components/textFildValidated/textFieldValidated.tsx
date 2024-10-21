import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Validate } from "mui-validate";

import * as S from "./textFieldValidated.styled";

type Props = {
  nameField: string;
  label?: string;
  conditionArray?: [(value: string) => boolean, string][];
  controled?: boolean;
  show?: boolean;
  placeholder?: string;
  value?: number | string;
  setValidationField: (result: any) => void;
  setFieldValue?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  sx?: object;
};

const TextFieldValidated: React.FC<Props> = ({
  nameField,
  label,
  conditionArray,
  controled = false,
  show = false,
  placeholder,
  value,
  setValidationField,
  setFieldValue,
  sx,
}) => {
  const [showField, setShowField] = useState(false);
  const [initialValidationDone, setInitialValidationDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleClickShow = () => setShowField((showField) => !showField);
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setFieldValue) {
      setFieldValue(event);
    }
  };

  const handleValidationField = (result: any) => {
    if (result) {
      setValidationField(result);
      if (!result.valid) {
        setErrorMessage(result.messages[0]);
      } else {
        setErrorMessage(null);
      }
    }
  };

  useEffect(() => {
    if (!initialValidationDone && value && conditionArray) {
      setInitialValidationDone(true);
      const validationResult = conditionArray.every(([condition]) =>
        condition(String(value))
      );

      const errorMessages = conditionArray
        .filter(([condition]) => !condition(String(value)))
        .map(([, message]) => message);

      handleValidationField({
        valid: validationResult,
        messages: errorMessages,
        display: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, conditionArray, initialValidationDone]);

  return (
    <S.MainContainer>
      {!controled ? (
        <S.TextFieldContainer show={show}>
          <Validate
            name={nameField}
            custom={conditionArray}
            after={(result: any) => handleValidationField(result)}
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
                value={value}
                onChange={handleFieldChange}
                error={!!errorMessage}
                sx={sx}
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
