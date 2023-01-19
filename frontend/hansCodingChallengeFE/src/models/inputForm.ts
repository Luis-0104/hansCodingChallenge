import { getParent, types } from "mobx-state-tree";
import { Customers } from "./customers";
import { InputElement } from "./inputElement";
export type infoType = {
  title: string;
  message: string;
  type: "error" | "warning" | "info" | "success" ;
};
export const InputForm = types
  .model({
    inputsList: types.optional(types.array(InputElement),[
        {id: "customer_number",
        value: 0,
        valid: undefined,
        helptext:""},
        {id: "first_name",
        value: "",
        valid:undefined,
        helptext:""},
        {id:  "last_name",
        value: "",
        valid:undefined,
        helptext:""},
        {id: "user_name",
        value: "",
        valid:undefined,
        helptext:""},
        {id:   "email",
        value: "",
        valid:undefined,
        helptext:""},
        {id:  "password",
        value: "",
        valid:undefined,
        helptext:""},
        {id: "repeat_password",
        value: "",
        valid:undefined,
        helptext:""},
    ]),
  })
  .actions((self) => ({

  }));

