import { Box, Typography } from "@mui/material";
import { useContext, useMemo } from "react";
import AuthContext from "../../store/auth/AuthContextProvider";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  MRT_EditActionButtons,
  MaterialReactTable,

  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  useMaterialReactTable,
} from "material-react-table";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HandymanIcon from "@mui/icons-material/Handyman";
import { User } from "../../types/users";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/fetchers/getUsers";
import * as S from "./admin.styled";

interface UserResponse {
  results: User[];
}

const Admin: React.FC = () => {
  const { authState } = useContext(AuthContext);

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

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // deleteUser(row.original.id);
    }
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "image",
        header: "Avatar",
        enableEditing: false,
        Cell: ({ row }) => {
          const imageData = row.original.image?.data;
          if (!imageData) return <span>No Image</span>;

          // Преобразование в Base64
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(imageData))
          );

          return (
            <img
              src={`data:image/png;base64,${base64String}`}
              alt="Avatar"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          );
        },
      },
      {
        accessorKey: "nom",
        header: "Nom",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "prenom",
        header: "Prènom",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
        },
      },
      {
        accessorKey: "numero",
        header: "Numéro",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "adresse",
        header: "Adresse",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "code_postal",
        header: "Code postal",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "ville",
        header: "Ville",
        muiEditTextFieldProps: {
          required: true,
        },
      },
    ],

    []
  );

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
    // onCreatingRowSave: handleCreateUser,
    // onEditingRowCancel: () => setValidationErrors({}),
    // onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
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
  console.log(userdata?.results ?? []);

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
        <MaterialReactTable
          key={userdata ? userdata.results.length : 0}
          table={table}
        />
      </S.InsidedContainer>
    </S.MainContainer>
  );
};

export default Admin;
