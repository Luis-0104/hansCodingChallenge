import React from "react";
import { useRootStore } from "../models/root";
import { Stack, TextField, Typography, styled } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { getRandomCustomerNumber, isCustomerNumberValid } from "../utils/inputUtils";

export const AddPerson = () => {
  const {
    store: {
      customers: { addCustomer, getCustomerWithID },
      information: { setInformation, setLoading },
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

  const isCustomerNumberFree = (customerNumber: number): boolean => {
    if (getCustomerWithID(customerNumber)) {
      return false;
    } else {
      return true;
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
              if(!isCustomerNumberValid(+evt.target.value)){
                
              }
            }}
          />
          <TextField label="First Name" variant="standard" />
          <TextField label="Last Name" variant="standard" />
          <TextField label="UserName" variant="standard" />
          <TextField label="Email-Adress" variant="standard" type="email" />
          <TextField label="Password" type="password" variant="standard" />
          <TextField
            label="Repeat Password"
            type="password"
            variant="standard"
          />
        </Stack>
      </div>
    </div>
  );
};
