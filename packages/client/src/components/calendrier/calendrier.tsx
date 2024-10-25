import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

import * as S from "./calendrier.styled";

type Props = {
  setDataValue: (dateValue: string) => void;
};

dayjs.locale("fr"); // Configurez Dayjs pour utiliser le français

export const Calendrier: React.FC<Props> = ({ setDataValue }) => {
  const currentDate = new Date();
  const [value, setValue] = useState<Dayjs | null>(dayjs(currentDate));

  return (
    <DemoContainer components={["DateCalendar", "DateCalendar"]}>
      <DemoItem label="Date de visite">
        <S.StyledDateCalendar
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setDataValue(newValue ? newValue.format("DD-MM-YYYY") : "");
          }}
          shouldDisableDate={(date) => date.isBefore(dayjs(), "day")}
        />
      </DemoItem>
    </DemoContainer>
  );
};

export default Calendrier;
