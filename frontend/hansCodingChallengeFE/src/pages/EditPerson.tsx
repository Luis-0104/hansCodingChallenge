import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { Button, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { useState } from "react";
import { Infobox } from "../components/Infobox";
import { Customer } from "../models/customer";
import { useRootStore } from "../models/root";
import { updateCustomer } from "../utils/dataHandler";

export const EditPerson = observer(() => {
  const {
    store: {
      customers: { getCustomerWithID, selectedCustomer, selectionType },
      information: { setLoading, setInformation },
      inputForm,
    },
  } = useRootStore();

  if (!(selectedCustomer && selectionType == "edit")) {
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
    return (
      <div
        style={{
          padding: "15px",
        }}
      >
        <Button href="/" variant="outlined">
          <ArrowBackOutlinedIcon />
        </Button>
        <Typography variant="h1">{`No user selected. Please go back.`}</Typography>
        <Infobox />
      </div>
    );
  }
  const customerToEdit = getCustomerWithID(+selectedCustomer) as Instance<
    typeof Customer
  >;

  //Fill the mst inputsList with the old values, so user doesn't have to tap though all the fields (as in the addPage)
  const [putValsInInputForm, setPutValsInInputForm] = useState(false);
  if (!putValsInInputForm) {
    inputForm.updateElement("customer_number", customerToEdit?.id.toString());
    inputForm.updateElement("first_name", customerToEdit?.first_name as string);
    inputForm.updateElement("last_name", customerToEdit?.last_name as string);
    inputForm.updateElement("user_name", customerToEdit?.user_name as string);
    inputForm.updateElement("email", customerToEdit?.email as string);
    inputForm.updateElement("password", ""); //Password clear for security
    inputForm.updateElement("repeat_password", "");
    inputForm.updateElement(
      "birth_date",
      customerToEdit?.birth_date.toString() as string
    );
    setPutValsInInputForm(true);
  }

  function saveChanges() {
    let oldID: number | undefined;
    if (customerToEdit.id != +inputForm.getElement("customer_number").value) {
      oldID = customerToEdit.id;
      customerToEdit?.setId(+inputForm.getElement("customer_number").value);
    }
    customerToEdit?.setFirstName(
      inputForm.getElement("first_name").value.toString()
    );
    customerToEdit?.setLastName(
      inputForm.getElement("last_name").value.toString()
    );
    customerToEdit?.setEmail(inputForm.getElement("email").value.toString());
    customerToEdit?.setBirthDate(
      new Date(inputForm.getElement("birth_date").value)
    );
    if (inputForm.getElement("password").value) {
      customerToEdit?.setPassword(
        inputForm.getElement("password").value.toString()
      );
    }
    setLoading(true);

    updateCustomer(customerToEdit, oldID)
      .then((val) => {
        setLoading(false);
        setInformation({
          title: "Succes!",
          message: `Updated ${customerToEdit.first_name} ${customerToEdit.last_name}`,
          type: "success",
        });
        window.location.replace("/");
        return new Promise(() => {});
      })
      .catch((err) => {
        setLoading(false);
        setInformation({
          title: "Error!",
          message: err.toString().slice(6),
          type: "error",
        });
        window.location.replace("/");
        return new Promise(() => {});
      });
  }

  //Generate random CustomerNumber
  function generateCustomerNumber() {
    let num;
    do {
      num = Math.floor(Math.random() * 90000) + 10000;
    } while (getCustomerWithID(num));
    return num;
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
        <Typography variant="h1">{`Edit ${
          getCustomerWithID(selectedCustomer)?.first_name
        } ${getCustomerWithID(selectedCustomer)?.last_name}`}</Typography>
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
              id="CustomerNumberInputField"
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
                id="generateCustomerNumberButton"
              >
                <AutorenewOutlinedIcon />
              </Button>
            </Tooltip>
          </div>

          <TextField
            label="First Name"
            variant="standard"
            defaultValue={customerToEdit?.first_name}
            onBlur={(evt) => {
              inputForm.updateElement("first_name", evt.target.value);
            }}
            helperText={inputForm.getElement("first_name")?.helptext}
            error={inputForm.getElement("first_name")?.valid == false}
            id="FirstNameInputField"
          />
          <TextField
            label="Last Name"
            variant="standard"
            defaultValue={customerToEdit?.last_name}
            onBlur={(evt) => {
              inputForm.updateElement("last_name", evt.target.value);
            }}
            helperText={inputForm.getElement("last_name")?.helptext}
            error={inputForm.getElement("last_name")?.valid == false}
            id="LastNameInputField"
          />
          <TextField
            label="UserName"
            variant="standard"
            defaultValue={customerToEdit?.user_name}
            onBlur={(evt) => {
              inputForm.updateElement("user_name", evt.target.value);
            }}
            helperText={inputForm.getElement("user_name")?.helptext}
            error={inputForm.getElement("user_name")?.valid == false}
            id="UserNameInputField"
          />
          <TextField
            label="Email-Adress"
            variant="standard"
            defaultValue={customerToEdit?.email}
            type="email"
            onBlur={(evt) => {
              inputForm.updateElement("email", evt.target.value);
            }}
            helperText={inputForm.getElement("email")?.helptext}
            error={inputForm.getElement("email")?.valid == false}
            id="EmailInputField"
          />
          <TextField
            variant="standard"
            label="Date Of Birth"
            type="date"
            defaultValue={
              customerToEdit?.birth_date.toISOString().split("T")[0]
            }
            onBlur={(evt) => {
              inputForm.updateElement("birth_date", evt.target.value);
            }}
            helperText={inputForm.getElement("birth_date")?.helptext}
            error={inputForm.getElement("birth_date")?.valid == false}
            id="BirthdayInputField"
          />
          <TextField
            disabled
            variant="standard"
            label="Last Login"
            type="datetime-local"
            defaultValue={customerToEdit?.last_login
              .toISOString()
              .split("Z")[0]
              .slice(0, -4)}
            onBlur={(evt) => {
              inputForm.updateElement("birth_date", evt.target.value);
            }}
            helperText={inputForm.getElement("birth_date")?.helptext}
            error={inputForm.getElement("birth_date")?.valid == false}
            id="LastLoginDisplayField"
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
            id="PasswordInputField"
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
            id="RepeatPasswordInputField"
          />
          <Button
            onClick={saveChanges}
            disabled={!inputForm.isAllValid()}
            id="EditPersonSubmitButton"
          >
            SAVE
          </Button>
        </Stack>
      </div>
    </div>
  );
});
