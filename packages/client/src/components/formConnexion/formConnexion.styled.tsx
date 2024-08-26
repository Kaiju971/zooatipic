import { Button, OutlinedInput, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { hexToRgba } from "../../utils/utils";

type Props = {
  show?: boolean;
};

export const MainContainer = styled("div")`
  padding-top: 2vh;
`;

export const StyledBox = styled("form")<Props>(({ theme }) => ({
  textAlign: "center",
  marginLeft: "30%",
  width: "40%",
  marginTop: "5%",
  marginBottom: "5%",
  color: theme.palette.colorJauneFonce.main,
  borderRadius: "10px",
  backgroundColor: hexToRgba(theme.palette.colorJauneFonce.main, 0.6),

  "& .MuiFormLabel-root": {
    color: theme.palette.colorJauneFonce.main,
  },

  "& .MuiTextField-root": {
    width: "36vw",
    borderRadius: "10px",
    borderColor: theme.palette.colorJauneBorder.main,
    color: theme.palette.colorJauneFonce.main,
    backgroundColor: theme.palette.primary.main,
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  },

  "& .MuiOutlinedInput-root": {
    width: "36vw",
    borderRadius: "10px",
    border: "solid",
    borderColor: theme.palette.colorJauneBorder.main,
    color: theme.palette.colorJauneFonce.main,
    backgroundColor: theme.palette.primary.main,
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    height: "6vh",
  },
}));

export const BoxTitle = styled("div")`
  padding-top: 4vh;
  padding-bottom: 4vh;
  height: auto;
  margin-top: 7rem;
  border-radius: 10px;
  color: ${({ theme }) => theme.palette.colorJauneTexte.main};
  background-color: ${({ theme }) =>
    hexToRgba(theme.palette.colorJauneFonce.main, 0.6)};
  @media (max-width: 750px) {
    width: 100%;
    height: 50%;
    margin-top: 2rem;
  }
`;

export const FlexBox = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.colorJauneBorder.main};
    }
  }
`;

export const Buttons = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2vh;

  @media (max-width: 750px) {
  }
`;

export const ButtonSubmit = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 15px;
  width: 90%;
  background-color: ${({ theme }) => theme.palette.colorVertButton.main};
`;

export const PTag = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

// Styled component for the rotating image
export const RotatingImage = styled("img")`
  animation: rotation 2s infinite linear; /* Rotation animation */
  width: 150px;
  height: auto;

  @keyframes rotation {
    from {
      transform: rotate(0deg); /* Start rotation from 0 degrees */
    }
    to {
      transform: rotate(360deg); /* End rotation at 360 degrees */
    }
  }
`;
