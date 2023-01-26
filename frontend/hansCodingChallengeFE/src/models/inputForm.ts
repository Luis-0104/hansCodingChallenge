import { Instance, getParent, types } from "mobx-state-tree";
import { Customers } from "./customers";
import { InputElement, inputElementIDType } from "./inputElement";
import { RootModel } from "./root";
export type infoType = {
  title: string;
  message: string;
  type: "error" | "warning" | "info" | "success";
};

export const InputForm = types
  .model({
    inputsList: types.optional(types.array(InputElement), [
      { id: "customer_number", value: 0, valid: undefined, helptext: "" },
      { id: "first_name", value: "", valid: undefined, helptext: "" },
      { id: "last_name", value: "", valid: undefined, helptext: "" },
      { id: "user_name", value: "", valid: undefined, helptext: "" },
      { id: "email", value: "", valid: undefined, helptext: "" },
      { id: "password", value: "", valid: undefined, helptext: "" },
      { id: "repeat_password", value: "", valid: undefined, helptext: "" },
    ]),
  })
  .actions((self) => ({
    updateElement(id: inputElementIDType, val: string) {
      let element = self.inputsList.find((el) => {
        return el.id == id;
      });
      element?.updateValue(val);
    },
  }))
  .views((self) => ({
    getElement(id: inputElementIDType): Instance<typeof InputElement> {
      const element = self.inputsList.find((el) => {
        return el.id == id;
      });
      return element as Instance<typeof InputElement>;
    },
    isAllValid() {
      return !self.inputsList.find((val) => {
        return val.valid != true;
      });
    },
  }));
