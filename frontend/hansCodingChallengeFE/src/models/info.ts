import { flow, getParent, getSnapshot, types } from "mobx-state-tree";
import { Customers } from "./customers";
export type infoType = {
  title: string;
  message: string;
  type: "error" | "warning" | "info" | "success";
};
export const Info = types
  .model({
    title: types.optional(types.string, ""),
    message: types.optional(types.string, ""),
    type: types.maybe(
      types.enumeration(["error", "warning", "info", "success", "loading"])
    ),
    loading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    clear() {
      (self.title = ""), (self.message = ""), (self.type = undefined);
    },
    setInformation: flow(function* ({ title, message, type }: infoType) {
      (self.title = title), (self.message = message), (self.type = type);
      console.log(`new Info: ${self.message}`)
      yield new Promise((res) => setTimeout(res, 10000));

      self.title = "";
      self.message = "";
      self.type = undefined;
    }),
    setLoading(isLoading: boolean) {
      self.loading = isLoading;
    },
  }))
  .actions((self) => ({
    afterCreate() {
      // After the page changes, we call the setInfo again, so it

      self.setInformation({
        title: self.title,
        message: self.message,
        type: self.type,
      } as infoType);
    },
  }));
