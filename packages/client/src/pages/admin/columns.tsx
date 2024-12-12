import { MRT_ColumnDef } from "material-react-table";
import { User } from "../../types/users";
import { useMemo } from "react";
import { ColumnDefinition } from "../../types/columns";

type Props = {
  columnsList: ColumnDefinition<User>[];
};

const TableColumns = ({ columnsList }: Props): MRT_ColumnDef<User>[] => {
  return useMemo(
    () =>
      columnsList.map(
        ({
          accessorKey,
          header,
          editable = true,
          type,
          customCellRenderer,
        }) => ({
          accessorKey,
          header,
          enableEditing: editable,
          muiEditTextFieldProps: type
            ? { type, required: true }
            : { required: true },
          Cell: customCellRenderer
            ? ({ row }) => customCellRenderer(row.original)
            : undefined,
        })
      ),
    [columnsList]
  );
};

export default TableColumns;
