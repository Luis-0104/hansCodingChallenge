import { Button, ButtonGroup } from "@mui/material";
import { Infobox } from "../components/Infobox";
import { List } from "../components/List";
import { useRootStore } from "../models/root";
import { loadData } from "../utils/dataHandler";

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
          id="addPersonButton"
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
            id="loadPersonsButton"
          >
            LOAD
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
