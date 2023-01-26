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
        console.log(
          getParent<typeof RootModel>(self, 3).customers.getCustomerWithID(+val)
        );
        if (
          getParent<typeof RootModel>(self, 3).customers.getCustomerWithID(+val)
        ) {
          self.helptext = `Customer-Number is already taken!`;
          self.valid = false;
        }
      }
    },
  }));
