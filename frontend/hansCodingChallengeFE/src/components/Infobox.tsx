import { LinearProgress } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton } from "@mui/material";
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
        <Alert severity="error" action={alertAction}>
          <strong>{information.title}</strong> {information.message}
        </Alert>
      </>
    );
  } else if (information.type == "warning") {
    infoAlert = (
      <>
        <Alert severity="warning" action={alertAction}>
          <strong>{information.title}</strong> {information.message}
        </Alert>
      </>
    );
  } else if (information.type == "info") {
    infoAlert = (
      <>
        <Alert severity="info" action={alertAction}>
          <strong>{information.title}</strong> {information.message}
        </Alert>
      </>
    );
  } else if (information.type == "success") {
    infoAlert = (
      <>
        <Alert severity="success" action={alertAction}>
          <strong>{information.title}</strong> {information.message}
        </Alert>
      </>
    );
  }
  if (information.loading) {
    return (
      <>
        {infoAlert}
        <LinearProgress />
      </>
    );
  } else {
    return infoAlert;
  }
});
