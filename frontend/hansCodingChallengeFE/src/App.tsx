import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { useRootStore } from "./models/root";
import { loadData, saveData } from "./models/dataHandler";
import { Button, ButtonGroup } from "@mui/material";
import { getSnapshot } from "mobx-state-tree";

function App() {
  const {
    store: {
      customers: {
        setCustomers
      },
      information: { setInformation, setLoading },
    },
  } = useRootStore();
  
  // Before creating any of the models, we need to fetch the data from the api
  setLoading(true)
  loadData().then((val) => {
    setCustomers(val);
  }).catch((err)=>{
    
    setLoading(false);
    setInformation({
      title:"Error!", message: err.toString().slice(6), type:"error"
    })
  })

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
            setLoading(true)
            const data = loadData();
            data.then((val) => {
              setCustomers(val);
            });
          }}>LOAD</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default App;
