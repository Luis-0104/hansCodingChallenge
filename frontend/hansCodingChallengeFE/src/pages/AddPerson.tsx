import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { Button, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Infobox } from "../components/Infobox";
import { useRootStore } from "../models/root";

export const AddPerson = observer(() => {
  const {
    store: {
      customers: { addCustomer, getCustomerWithID },
      information: { setInformation, setLoading },
      inputForm,
    },
  } = useRootStore();

  const addPerson = () => {
    addCustomer({
      id: +inputForm.getElement("customer_number").value,
      user_name: inputForm.getElement("user_name").value.toString(),
      first_name: inputForm.getElement("first_name").value.toString(),
      last_name: inputForm.getElement("last_name").value.toString(),
      birth_date: new Date(inputForm.getElement("birth_date").value),
      email: inputForm.getElement("email").value.toString(),
      password: inputForm.getElement("password").value.toString(),
      last_login: new Date(), //current timestamp is last login
    });
    setLoading(true);
  };

  //Generate random CustomerNumber
  function generateCustomerNumber() {
    let num;
    do {
      num = Math.floor(Math.random() * 90000) + 10000;
    } while (getCustomerWithID(num));
    return num;
  }

  const [numberSet, setnumberSet] = React.useState(false);
  if (!numberSet) {
    inputForm.updateElement(
      "customer_number",
      generateCustomerNumber().toString()
    );
    setnumberSet(true);
  }
  // TODO: Css in den Griff bekommen, dass das ganze nach was ausschaut
  return (
    <div>
      <div
        style={{
          padding: "15px",
        }}
      >
        <Button href="/" variant="outlined">
          <ArrowBackOutlinedIcon />
        </Button>
        <Typography variant="h1">Add a new User</Typography>
        <Infobox />
      </div>
      <div
        style={{
          maxWidth: "300px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack spacing={2}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              label="Customer-Number"
              type="number"
              variant="standard"
              value={inputForm.getElement("customer_number").value}
              onChange={(evt) => {
                inputForm.updateElement("customer_number", evt.target.value);
              }}
              helperText={inputForm.getElement("customer_number")?.helptext}
              error={inputForm.getElement("customer_number")?.valid == false}
            />

            <Tooltip title="Generate random customer number" placement="right">
              <Button
                onClick={() => {
                  inputForm.updateElement(
                    "customer_number",
                    generateCustomerNumber().toString()
                  );
                  
                }}
                variant="outlined"
              >
                <AutorenewOutlinedIcon />
              </Button>
            </Tooltip>
          </div>

          <TextField
            label="First Name"
            variant="standard"
            onBlur={(evt) => {
              inputForm.updateElement("first_name", evt.target.value);
            }}
            helperText={inputForm.getElement("first_name")?.helptext}
            error={inputForm.getElement("first_name")?.valid == false}
          />
          <TextField
            label="Last Name"
            variant="standard"
            onBlur={(evt) => {
              inputForm.updateElement("last_name", evt.target.value);
            }}
            helperText={inputForm.getElement("last_name")?.helptext}
            error={inputForm.getElement("last_name")?.valid == false}
          />
          <TextField
            label="UserName"
            variant="standard"
            onBlur={(evt) => {
              inputForm.updateElement("user_name", evt.target.value);
            }}
            helperText={inputForm.getElement("user_name")?.helptext}
            error={inputForm.getElement("user_name")?.valid == false}
          />
          <TextField
            label="Email-Adress"
            variant="standard"
            type="email"
            onBlur={(evt) => {
              inputForm.updateElement("email", evt.target.value);
            }}
            helperText={inputForm.getElement("email")?.helptext}
            error={inputForm.getElement("email")?.valid == false}
          />
          <TextField
            variant="standard"
            label="Date Of Birth"
            type="date"
            defaultValue={"2000-01-01"}
            onBlur={(evt) => {
              inputForm.updateElement("birth_date", evt.target.value);
            }}
            helperText={inputForm.getElement("birth_date")?.helptext}
            error={inputForm.getElement("birth_date")?.valid == false}
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            onBlur={(evt) => {
              inputForm.updateElement("password", evt.target.value);
            }}
            helperText={inputForm.getElement("password")?.helptext}
            error={inputForm.getElement("password")?.valid == false}
          />
          <TextField
            label="Repeat Password"
            type="password"
            variant="standard"
            onBlur={(evt) => {
              inputForm.updateElement("repeat_password", evt.target.value);
            }}
            helperText={inputForm.getElement("repeat_password")?.helptext}
            error={inputForm.getElement("repeat_password")?.valid == false}
          />
          <Button onClick={addPerson} disabled={!inputForm.isAllValid()}>
            SUMBMIT
          </Button>
        </Stack>
      </div>
    </div>
  );
});
