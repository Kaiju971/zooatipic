import { styled } from "@mui/material/styles";
import { Box, Tab, Tabs } from "@mui/material";

const sharedStyleBox = `
    background-color: #00000027;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export const MainContainer = styled("div")`
  padding-top: 14vh;
  padding-bottom: 3vh;
  min-height: 100vh;
  color: ${({ theme }) => theme.palette.colorVertMenu.main};
`;

export const InsidedContainer = styled("div")`
  background-color: ${({ theme }) => theme.palette.colorBackgroundForm.main};
  color: ${({ theme }) => theme.palette.colorVertMenu.main};
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  border-radius: 10px;

  @media (max-width: 750px) {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
`;

export const FlexBox = styled("div")`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 4vw;
  padding-top: 2vh;
`;

export const StyledBox = styled(Box)`
  display: grid;
  grid-template-columns: 10% 90%;

  @media (max-width: 960px) {
    width: 100%;
    grid-template-columns: 100%;
  }
`;

export const StyledTabs = styled(Tabs)<{ horizontal: boolean }>`
  border-right: ${(props) => (props.horizontal ? "none" : "solid")};
  border-color: #146252;

  & .MuiTabPanel-root {
    width: 100vw;
  }
`;

export const StyledTab = styled(Tab)`
  color: ${({ theme }) => theme.palette.colorVertMenu.main};
  font-size: 0.9rem;
  &.MuiTab-root.Mui-selected {
    ${sharedStyleBox}
  }

  @media (max-width: 1700px) {
    font-size: 0.8rem;
  }
  @media (max-width: 1550px) {
    font-size: 0.7rem;
  }

  @media (max-width: 1350px) {
    font-size: 0.5rem;
  }
  @media (max-width: 1200px) {
    font-size: 0.4rem;
  }

  @media (max-width: 960px) {
    font-size: 0.9rem;
  }
  @media (max-width: 560px) {
    font-size: 0.4rem;
  }
`;

export const StyledTabPanelBox = styled("div")`
  width: "100%";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CartGridContainer = styled("div")<{ horizontal: boolean }>`
  ${sharedStyleBox}
  width: ${(props) => (props.horizontal ? "80vw" : "100%")};
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: auto;
  text-align: center;
  margin-bottom: 10vh;
`;
