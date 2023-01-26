import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Tooltip,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../models/root";
import { getSnapshot } from "mobx-state-tree";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Customers } from "../models/customers";
import { DeleteAlert } from "./DeleteAlert";

export const List = observer(() => {
  const {
    store: {
      customers: { customerList, selectCustomerToDelete, selectCustomerToEdit },
      information: { setInformation },
    },
  } = useRootStore();
  const rawsRAW = customerList.map((el) => {
    return {
      ...el,
      birth_date: el.birth_date.toLocaleDateString(),
      last_login : el.last_login.toLocaleString(),
    };
    
  });
  const rows: GridRowsProp = rawsRAW

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user_name", headerName: "USERNAME", minWidth: 130, flex: 0.5 },
    { field: "first_name", headerName: "FIRST_NAME", minWidth: 150, flex: 0.5 },
    { field: "last_name", headerName: "LAST_NAME", minWidth: 150, flex: 0.5 },
    { field: "birth_date", headerName: "BIRTH_DATE", minWidth: 250, flex: 1 },
    { field: "email", headerName: "EMAIL", minWidth: 250, flex: 0.7 },
    { field: "last_login", headerName: "LAST_LOGIN", minWidth: 250, flex: 1 },
    {
      field: "options",
      headerName: "OPTIONS",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <div
          style={{
            width: "100%",
          }}
        >
          <Tooltip title="edit" arrow>
            <IconButton
              style={{
                color: "blue",
              }}
              size="small"
              onClick={() => console.log()}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete" arrow>
            <IconButton
              style={{
                color: "red",
              }}
              size="small"
              onClick={() => {
                selectCustomerToDelete(params.row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 100 },
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
            },
          }}
        />
        <DeleteAlert />
      </div>
    </div>
  );
});
