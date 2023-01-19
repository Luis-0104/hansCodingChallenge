import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { useRootStore } from "./models/root";
import { loadData, saveData } from "./models/dataHandler";
import { Button, ButtonGroup } from "@mui/material";
import { getSnapshot } from "mobx-state-tree";
import { AddPerson } from "./pages/AddPerson";

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
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="addPerson" element={<AddPerson />} />
          <Route path="*" element={<>nothing</>} />
          <Route path="edit/*" element={<>nothindfdg</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
