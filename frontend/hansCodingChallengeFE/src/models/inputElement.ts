import { getParent, types } from "mobx-state-tree";
import { Customers } from "./customers";
import { validateInput } from "../utils/inputUtils";
import { InputForm } from "./inputForm";
import { RootModel } from "./root";
export type inputElementIDType =
  | "customer_number"
  | "first_name"
  | "last_name"
  | "user_name"
  | "email"
  | "birth_date"
  | "last_login"
  | "password"
  | "repeat_password";
export type inputElement = {
  id: inputElementIDType;
  value: number | string;
  valid: boolean | undefined;
  helptext: string;
};
export const InputElement = types
  .model({
    id: types.enumeration([
      "customer_number",
      "first_name",
      "last_name",
      "user_name",
      "email",
      "birth_date",
      "password",
      "repeat_password",
    ]),
    value: types.union(types.string, types.number),
    valid: types.maybe(types.boolean),
    helptext: types.optional(types.string, ""),
  })
  .actions((self) => ({
    updateValue(val: typeof self.value) {
      self.value = val;

      // All the generic validations
      ({ helpText: self.helptext, valid: self.valid } = validateInput({
        id: self.id,
        val: self.value,
      }));

      // Check if passwords are the same
      if (self.id == "repeat_password") {
        if (
          getParent<typeof InputForm>(self, 2).getElement("password")?.value !=
          self.value
        ) {
          self.helptext = `Passwords aren't the same!`;
          self.valid = false;
        }
      }

      // Check if password-field changed, to let repeat_password check again
      if (self.id == "password") {
        let repeat_password = getParent<typeof InputForm>(self, 2).getElement(
          "repeat_password"
        );
        if (repeat_password?.value != "") {
          repeat_password?.updateValue(repeat_password.value);
        }
      }

      // Only check user_name and customer_number taken, if a user needs to be added.
      if (
        getParent<typeof RootModel>(self, 3).customers.selectionType == "edit"
      ) {
        // Number/UserName taken on editpage is different, because th id is taken by th current selected User itself

        // In the edit page the passwordfield is allowed to be empty if the password doesn't change
        if (self.id == "password" && self.value == "") {
          self.helptext = "";
          self.valid = true;
        }
        //Check if user_name is taken
        if (self.id == "user_name") {
          const foundCustomerWithSameUserName = getParent<typeof RootModel>(
            self,
            3
          ).customers.getCustomerWithUserName(val.toString());
          if (
            foundCustomerWithSameUserName &&
            foundCustomerWithSameUserName.id !=
              getParent<typeof RootModel>(self, 3).customers.selectedCustomer
          ) {
            self.helptext = `UserName is already taken!`;
            self.valid = false;
          }
        }

        //Check if customer_number is taken
        if (self.id == "customer_number") {
          const foundCustomerWithSameID = getParent<typeof RootModel>(
            self,
            3
          ).customers.getCustomerWithID(+val);
          if (
            foundCustomerWithSameID &&
            foundCustomerWithSameID.id !=
              getParent<typeof RootModel>(self, 3).customers.selectedCustomer
          ) {
            self.helptext = `Customer-Number is already taken!`;
            self.valid = false;
          }
        }
      } else {
        //Check if user_name is taken
        if (self.id == "user_name") {
          if (
            getParent<typeof RootModel>(
              self,
              3
            ).customers.getCustomerWithUserName(val.toString())
          ) {
            self.helptext = `UserName is already taken!`;
            self.valid = false;
          }
        }

        //Check if customer_number is taken
        if (self.id == "customer_number") {
          if (
            getParent<typeof RootModel>(self, 3).customers.getCustomerWithID(
              +val
            )
          ) {
            self.helptext = `Customer-Number is already taken!`;
            self.valid = false;
          }
        }
      }
    },
  }));
