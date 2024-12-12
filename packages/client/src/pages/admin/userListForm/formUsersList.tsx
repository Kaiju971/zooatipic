import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import AuthContext from "../../../store/auth/AuthContextProvider";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_Row,
  useMaterialReactTable,
  MRT_TableOptions,
} from "material-react-table";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../../types/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/fetchers/getUsers";
import * as S from "./formUsersList.styled";
import { AxiosError } from "axios";
import { createUser } from "../../../api/fetchers/createUser";
import { useSnackbar } from "notistack";
import React from "react";
import TableColumns from "../columns";
import { UserColumnsList } from "../../../constants/userColumnsList";
import { UserRoles } from "../../../constants/roles";
import { setFormData } from "../setFormdata";

interface UserResponse {
  results: User[];
}

const roles = Object.keys(UserRoles);

const FormUsersList: React.FC = () => {
  const { authState } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRole, setSelectedRole] = useState<string>(UserRoles.SALARIE);

  const {
    data: userdata,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
    isError: isLoadingUsersError,
    refetch,
  } = useQuery<UserResponse>({
    queryKey: ["getallusers"],
    queryFn: getUsers,
    enabled: authState.isLoggedIn,
  });

  const { mutate: saveUser } = useMutation<
    { results: { id: number }[] },
    AxiosError,
    User
  >({
    mutationFn: createUser,
    onSuccess: (result) => {
      console.log("Result from mutation:", result);
    },
    onError: (error: AxiosError) => {
      console.error(error.response);
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message;
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    },
  });

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    // const newValidationErrors = validateUser(values);

    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);

    //   return;
    // }

    // setValidationErrors({});

    const fieldsAdresse = ["numero", "adresse", "code_postal", "ville"];
    const formDataAdresse = setFormData(values, fieldsAdresse);

    const fieldsUser = ["email", "password", "nom", "prenom", "role", "avatar"];
    const updatedValues = { ...values, role: selectedRole.toUpperCase() };
    const formDataUser = setFormData(updatedValues, fieldsUser);

    // saveUser(formDataUser);

    table.setCreatingRow(null); //exit creating mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // deleteUser(row.original.id);
    }
  };

  // const columnsList = [
  //   { accessorKey: "id", header: "Id", editable: false },
  //   { accessorKey: "nom", header: "Nom" },
  //   { accessorKey: "prenom", header: "Prénom" },
  //   { accessorKey: "role", header: "Role" },
  //   { accessorKey: "email", header: "Email", type: "email" },
  //   { accessorKey: "password", header: "Password" },
  //   {
  //     accessorKey: "image",
  //     header: "Avatar",
  //     editable: false,
  //     // customCellRenderer: ({ row }: MRT_Row) => {
  //     //   const imageData = row.original.image?.data;
  //     //   if (!imageData) return <span>No Image</span>;

  //     //   const base64String = btoa(
  //     //     String.fromCharCode(...new Uint8Array(imageData))
  //     //   );

  //     //   return (
  //     //     <img
  //     //       src={`data:image/png;base64,${base64String}`}
  //     //       alt="Avatar"
  //     //       style={{ width: "50px", height: "50px", borderRadius: "50%" }}
  //     //     />
  //     //   );
  //     // },
  //   },
  // ];

  const columns = TableColumns({ columnsList: UserColumnsList });

  const table = useMaterialReactTable({
    columns,
    data: userdata?.results ?? [],
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row?.id?.toString() ?? "",
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    // onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    // onEditingRowCancel: () => setValidationErrors({}),
    // onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {Object.keys(row.original).map((key) => {
            if (key === "role") {
              return (
                <FormControl
                  fullWidth
                  key={key}
                  style={{ marginBottom: "1rem" }}
                >
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    defaultValue={UserRoles.VISITEUR}
                    onChange={(event) => setSelectedRole(event.target.value)}
                  >
                    {roles.map((item) => (
                      <MenuItem value={item.toString()}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }

            if (key === "image") {
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label style={{ fontWeight: "bold" }}>Avatar</label>
                  <input
                    type="file"
                    accept="image/*"
                    // onChange={(event) => handleFileChange(event, row, table)}
                  />
                  {/* {row.original.image && (
            <img
              src={`data:image/png;base64,${base64String}`}
              alt="Avatar Preview"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
          )} */}
                </div>
              );
            }

            const fieldComponent = internalEditComponents.find((comp) => {
              if (!React.isValidElement(comp)) return false;
              return comp.props?.cell?.column?.id === key;
            });

            if (fieldComponent) {
              return <div key={key}>{fieldComponent}</div>;
            }

            return <div key={key}></div>;
          })}
        </DialogContent>

        <DialogActions>
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        <Tooltip arrow title="Refresh Data">
          <IconButton onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true); //simplest way to open the create row modal with no default values
            //or you can pass in a row object to set default values with the `createRow` helper function
            // table.setCreatingRow(
            //   createRow(table, {
            //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
            //   }),
            // );
          }}
        >
          Create New User
        </Button>
      </>
    ),
    state: {
      isLoading: isLoadingUsers,
      // isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  if (isLoadingUsers) return <p>Loading...</p>;
  if (isLoadingUsersError) return <p>Error loading data</p>;

  return (
    <S.MainContainer>
      <MaterialReactTable table={table} />
    </S.MainContainer>
  );
};

export default FormUsersList;
