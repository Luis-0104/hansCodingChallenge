import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { useRootStore } from "./models/root";
import { loadData, saveData } from "./models/dataHandler";
import { Button, ButtonGroup } from "@mui/material";
import { getSnapshot } from "mobx-state-tree";

function App() {
  const rootStore = useRootStore();
  // Before creating any of the models, we need to fetch the data from the api
  const data = loadData();
  data.then((val) => {
    rootStore.store.customers.setCustomers(val);
  });

  return (
    <div className="App">
    
      <Home></Home>
      <div
        style={{
          height: "50px",
          
        }}
      >
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={(evt)=>{
            const data = loadData();
            data.then((val) => {
              rootStore.store.customers.setCustomers(val);
            });
          }}>LOAD</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default App;
