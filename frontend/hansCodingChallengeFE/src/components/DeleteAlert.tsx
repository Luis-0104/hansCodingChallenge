import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRootStore } from "../models/root";
import { observer } from "mobx-react-lite";

export const DeleteAlert = observer(() => {
  const {
    store: {
      customers: {
        removeSelectedCustomer,
        selectedCustomer,
        resetSelection,
        selectionType,
      },
      information: { set },
    },
  } = useRootStore();

  return (
    <div>
      <Dialog
        open={selectionType == "delete"}
        onClose={resetSelection}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${selectedCustomer}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
              removeSelectedCustomer();
              resetSelection();
            }}>Yes</Button>
          <Button
            onClick={resetSelection}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
