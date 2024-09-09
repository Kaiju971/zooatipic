import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.buttonNoir.main};
  padding-right: 4rem;
  padding-left: 4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
