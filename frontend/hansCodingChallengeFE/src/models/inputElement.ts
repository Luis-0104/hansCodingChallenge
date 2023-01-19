import { getParent,types } from "mobx-state-tree";
import { Customers } from "./customers";
export type inputElement = {
  id: "customer_number"| "first_name"| "last_name"| "user_name"| "email"| "password"| "repeat_password";
  value: number|string;
  valid: boolean | undefined;
  helptext:string;
};
export const InputElement = types
  .model({
    id: types.enumeration(["customer_number", "first_name", "last_name", "user_name", "email", "password", "repeat_password"]),
    value: types.union(types.string , types.number),
    valid: types.maybe(types.boolean),
    helptext: types.optional(types.string,"")
  })
  .actions((self) => ({
    updateValue(val: typeof self.value){
      self.value = val
      // TODO: Hier kommt die ganze Logik zu validation rein 
    }
  }));

