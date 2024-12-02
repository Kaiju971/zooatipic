import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  height: 100%;
  padding-top: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.palette.secondary.main};
  padding-left: 16px;
  padding-right: 16px;
`;

export const ArticleContainer = styled("div")`
  /* border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center; */
`;

export const Title = styled(Typography)`
  padding: 16px;
`;
