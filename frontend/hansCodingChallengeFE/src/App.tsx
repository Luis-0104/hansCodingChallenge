import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Router,
  HashRouter,
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { RootContextProvider, useRootStore } from "./models/root";
import { loadData, saveData } from "./models/dataHandler";
import { Button, ButtonGroup } from "@mui/material";
import { getSnapshot } from "mobx-state-tree";
import { AddPerson } from "./pages/AddPerson";
import { Infobox } from "./components/Infobox";
import React from "react";
import { EditPerson } from "./pages/EditPerson";

function App() {
  const {
    store: {
      customers: { setCustomers },
      information: { setInformation, setLoading },
    },
  } = useRootStore();

  // Before creating any of the models, we need to fetch the data from the api
  setLoading(true);
  loadData()
    .then((val) => {
      setCustomers(val);
    })
    .catch((err) => {
      setLoading(false);
      setInformation({
        title: "Error!",
        message: err.toString().slice(6),
        type: "error",
      });
    });

  return (
    <div className="App">
      <RootContextProvider value={useRootStore()}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="addPerson" element={<AddPerson />} />
            <Route path="*" element={<>nothing</>} />
            <Route path="edit/*" element={<EditPerson />} />
          </Routes>
        </BrowserRouter>
      </RootContextProvider>
    </div>
  );
}

export default App;
