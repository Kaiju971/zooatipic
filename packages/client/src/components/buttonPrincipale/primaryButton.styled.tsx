import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

type ButtonProps = {
  colorVert?: boolean;
};

export const StyledButton = styled(Button)<ButtonProps>(
  ({ colorVert = false, theme }) => ({
    backgroundColor: colorVert
      ? theme.palette.colorVertButton.main
      : theme.palette.buttonNoir.main,
    paddingRight: "4rem",
    paddingLeft: "4rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",

    "&.MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
      color: theme.palette.colorJauneFooter.main,
    },

    "&.Mui-disabled": {
      backgroundColor: theme.palette.colorBackgroundForm.main,
      color: theme.palette.primary.main,
      cursor: "not-allowed",
    },
  })
);
