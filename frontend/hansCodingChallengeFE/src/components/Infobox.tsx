import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, LinearProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../models/root";

export const Infobox = observer(() => {
  const {
    store: { information },
  } = useRootStore();
  const alertAction = (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        information.clear();
      }}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );
  let infoAlert = <></>;
  if (!information.type) {
    infoAlert = <></>;
  } else if (information.type == "error") {
    infoAlert = (
      <>
        <Alert
          severity="error"
          action={alertAction}
          id={`${information.type}InfoAlert`}
        >
          <strong>{information.title}</strong> {information.message}
        </Alert>
      </>
    );
  } else if (information.type == "warning") {
    infoAlert = (
      <>
        <Alert
          severity="warning"
          action={alertAction}
          id={`${information.type}InfoAlert`}
        >
          <strong>{information.title}</strong> {information.message}
        </Alert>
      </>
    );
  } else if (information.type == "info") {
    infoAlert = (
      <>
        <Alert
          severity="info"
          action={alertAction}
          id={`${information.type}InfoAlert`}
        >
          <strong>{information.title}</strong> {information.message}
        </Alert>
      </>
    );
  } else if (information.type == "success") {
    infoAlert = (
      <>
        <Alert
          severity="success"
          action={alertAction}
          id={`${information.type}InfoAlert`}
        >
          <strong>{information.title}</strong> {information.message}
        </Alert>
      </>
    );
  }
  if (information.loading) {
    return (
      <>
        {infoAlert}
        <LinearProgress id="linearProgress" />
      </>
    );
  } else {
    return infoAlert;
  }
});
