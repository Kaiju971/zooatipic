import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const MainContainer = styled("div")`
  margin-top: 1vh;
  margin-bottom: 2vh;
  width: 100%;
  min-height: 9vh;
`;

export const TextField = styled("div")<{ isExpanded: boolean; rows: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${({ isExpanded, rows }) =>
    isExpanded ? "unset" : rows};
  line-height: 1.5em;
  text-align: center;
`;

export const ButtonShowMore = styled(Button)`
  padding-left: 0;
`;
