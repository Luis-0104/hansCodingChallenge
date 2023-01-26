import React from "react";
import { useRootStore } from "../models/root";
import { Stack, TextField, Typography, styled } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import {
  getRandomCustomerNumber,
} from "../utils/inputUtils";
import { observer } from "mobx-react-lite";

export const AddPerson = observer(() => {
  const {
    store: {
      customers: { addCustomer, getCustomerWithID },
      information: { setInformation, setLoading },
      inputForm,
    },
  } = useRootStore();

  const getRandomFreeCustomerNumber = (): number => {
    const num = getRandomCustomerNumber();
    if (getCustomerWithID(num)) {
      return getRandomFreeCustomerNumber();
    } else {
      return num;
    }
  };

  // TODO: Css in den Griff bekommen, dass das ganze nach was ausschaut
  return (
    <div>
      <div
        style={{
          padding: "15px",
        }}
      >
        <Typography variant="h1">Add a new User</Typography>
      </div>
      <div
        style={{
          maxWidth: "300px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Customer-Number"
            type="number"
            variant="standard"
            defaultValue={getRandomFreeCustomerNumber()}
            onBlur={(evt) => {
              inputForm.updateElement("customer_number", evt.target.value);
            }}
            helperText={inputForm.getElement("customer_number")?.helptext}
            error={inputForm.getElement("customer_number")?.valid == false}
          />
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
            disabled = {!inputForm.getElement("password")?.valid}
          />
        </Stack>
      </div>
    </div>
  );
});
