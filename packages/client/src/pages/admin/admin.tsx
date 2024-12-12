import { Typography } from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";
import FormUsersList from "./userListForm";

import * as S from "./admin.styled";

const Admin: React.FC = () => {
  return (
    <S.MainContainer>
      <S.InsidedContainer>
        <S.FlexBox>
          <HandymanIcon fontSize="large" />
          <Typography variant="h2" sx={{ pl: 10 }}>
            Page Admin
          </Typography>
        </S.FlexBox>
        <Typography variant="body2" sx={{ pl: 24, pb: 4 }}>
          site managment
        </Typography>
        <FormUsersList />
      </S.InsidedContainer>
    </S.MainContainer>
  );
};

export default Admin;
