import { OutlinedInput, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  show?: boolean;
};

export const MainContainer = styled("div")`
  padding-top: 2vh;
`;

export const TextFieldContainer = styled("div")<Props>(({ show = false }) => ({
  display: show ? "flex" : "none",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export const TextFieldBox = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 762px) {
    width: 91.5%;
    margin-left: 3%;
  }
  @media (max-width: 530px) {
    width: 90%;
  }
`;

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.colorJauneBorder.main};
    }
  }
`;

export const StyledOutlinedInput = styled(OutlinedInput)`
  & .MuiFormControl-root {
    width: 100%;
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.colorJauneBorder.main};
    }
  }
`;
