import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import * as S from "./calendrier.styled";

type Props = {
  setDataValue: (dateValue: string) => void;
};

export const Calendrier: React.FC<Props> = ({ setDataValue }) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));

  return (
    <DemoContainer components={["DateCalendar", "DateCalendar"]}>
      <DemoItem label="Date de visite">
        <DateCalendar
          value={value}
          onChange={(newValue) => {
            setValue(newValue); // Met à jour localement la date sélectionnée
            setDataValue(newValue ? newValue.format("YYYY-MM-DD") : "");
          }}
        />
      </DemoItem>
    </DemoContainer>
  );
};

export default Calendrier;
