import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: center;

  padding-bottom: 20px;
`;

export const AnimatedComponent = styled("div")`
  animation: slideUp 0.5s ease-in-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const TitleContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin: 0 0 1em;
`;
