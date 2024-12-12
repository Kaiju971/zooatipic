import { ColumnDefinition } from "../types/columns";
import { User } from "../types/users";

export const UserColumnsList: ColumnDefinition<User>[] = [
  { accessorKey: "id", header: "Id", editable: false },
  {
    accessorKey: "image",
    header: "Avatar",
    // editable: false,
    customCellRenderer: (user) => {
      const imageData = user.image?.data;
      if (imageData) {
        const base64Image = `data:image/jpeg;base64,${btoa(
          String.fromCharCode(...imageData)
        )}`;
        return (
          <img
            src={base64Image}
            alt="Avatar"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        );
      }
      return <span>No Avatar</span>;
    },
  },
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "prenom", header: "Prénom" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "email", header: "Email", type: "email" },
  { accessorKey: "password", header: "Password" },
  { accessorKey: "numero", header: "Numero" },
  { accessorKey: "adresse", header: "Adresse" },
  { accessorKey: "code_postal", header: "Code postal" },
  { accessorKey: "ville", header: "Ville" },
];
