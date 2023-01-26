import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { List } from "../components/List";
import { Infobox } from "../components/Infobox";
import { loadData, saveData } from "../models/dataHandler";
import { Button, ButtonGroup } from "@mui/material";
import { getSnapshot } from "mobx-state-tree";
import { AddPerson } from "./AddPerson";
import { useRootStore } from "../models/root";

export const Home = () => {
  const {
    store: {
      customers: { setCustomers },
      information: { setLoading },
    },
  } = useRootStore();
  
  return (
    <div
      style={{
        height: "1000px",
        color: "blue",
      }}
    >
      <div
        style={{
          padding: "10px 0px",
        }}
      >
        <Button
          href= "/addPerson"
          variant="outlined"
          style={{
            color: "green",
          }}
        >
          Add Person
        </Button>
        <Infobox />
      </div>
      <List></List>
      <div
        style={{
          height: "50px",
          padding: "10px",
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            onClick={(evt) => {
              setLoading(true);
              const data = loadData();
              data.then((val) => {
                setCustomers(val);
              });
            }}
          >
            LOAD
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
