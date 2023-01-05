import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../models/root";

export const List = observer(() => {
  const { store } = useRootStore();
  return (
    <div>
      dataGrid
      <Button onClick={(evt) => {
        console.log(store.customers)
      }}>Import Data</Button>
    </div>
  );
});
