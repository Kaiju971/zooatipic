import { ColumnDefinition } from "../types/columns";
import { User } from "../types/users";

export const UserColumnsList: ColumnDefinition<User>[] = [
  { accessorKey: "id", header: "Id", editable: false },
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "prenom", header: "Prénom" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "email", header: "Email", type: "email" },
  { accessorKey: "password", header: "Password" },
  { accessorKey: "numero", header: "Numero" },
  { accessorKey: "adresse", header: "Adresse" },
  { accessorKey: "code_postal", header: "Code postal" },
  { accessorKey: "ville", header: "Ville" },
  //{
  // accessorKey: "image",
  // header: "Avatar",
  // editable: false,
  // customCellRenderer: ({ row }: MRT_Row) => {
  //   const imageData = row.original.image?.data;
  //   if (!imageData) return <span>No Image</span>;

  //   const base64String = btoa(
  //     String.fromCharCode(...new Uint8Array(imageData))
  //   );

  //   return (
  //     <img
  //       src={`data:image/png;base64,${base64String}`}
  //       alt="Avatar"
  //       style={{ width: "50px", height: "50px", borderRadius: "50%" }}
  //     />
  //   );
  // },
  //},
];
