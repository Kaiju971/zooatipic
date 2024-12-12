export type ColumnDefinition<T> = {
  accessorKey: keyof T;
  header: string;
  editable?: boolean;
  type?: string;
  customCellRenderer?: (data: T) => React.ReactNode;
};
