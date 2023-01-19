import { getParent, types } from "mobx-state-tree";
import { Customers } from "./customers";
export type infoType = {
  title: string;
  message: string;
  type: "error" | "warning" | "info" | "succes" | "loading" | "empty";
};
export const Info = types
  .model({
    title: types.optional(types.string, ""),
    message: types.optional(types.string, ""),
    type: types.optional(
      types.enumeration([
        "error",
        "warning",
        "info",
        "succes",
        "loading",
        "empty",
      ]),
      "empty"
    ),
  })
  .actions((self) => ({
    clear() {
      (self.title = ""), (self.message = ""), (self.type = "empty");
    },
    set({ title, message, type }: infoType) {
      (self.title = title), (self.message = message), (self.type = type);
    },
  }));
