import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  text-align: center;
  color: ${({ theme }) => theme.palette.secondary.main};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  @media (max-width: 750px) {
    align-items: center;
    height: 100%;
  }
`;

export const GridContainer = styled("div")`
  margin-top: 4%;
  margin-bottom: 4%;
  grid-row-gap: 5%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: auto;
  /* justify-items: center; */
  align-items: center;

  @media (max-width: 750px) {
    grid-template-columns: 100%;
    margin-left: 10%;
  }
`;

export const BreadcrumbsContainer = styled("div")`
  padding-top: 18vh;
  padding-left: 8vw;
  font-style: italic;
  z-index: 2000;
`;
