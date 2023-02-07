import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../models/root";

export const DeleteAlert = observer(() => {
  const {
    store: {
      customers: {
        removeSelectedCustomer,
        selectedCustomer,
        resetSelection,
        selectionType,
        getCustomerWithID,
      },
      information: {setLoading},
    },
  } = useRootStore();

  return (
    <div>
      <Dialog
        open={selectionType == "delete"}
        onClose={resetSelection}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        id="DeleteAlertDialog"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${getCustomerWithID(selectedCustomer as number)?.first_name} ${getCustomerWithID(selectedCustomer as number)?.last_name}`}
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
              setLoading(true);
            
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
