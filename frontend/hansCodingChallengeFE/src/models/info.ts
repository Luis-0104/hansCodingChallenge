import { getParent, types } from "mobx-state-tree";
import { Customers } from "./customers";
export type infoType = {
  title: string;
  message: string;
  type: "error" | "warning" | "info" | "success" ;
};
export const Info = types
  .model({
    title: types.optional(types.string, ""),
    message: types.optional(types.string, ""),
    type: types.maybe(
      types.enumeration(["error", "warning", "info", "success", "loading"])
    ),
    loading: types.optional(types.boolean,false)
  })
  .actions((self) => ({
    clear() {
      (self.title = ""), (self.message = ""), (self.type = undefined);
    },
    setInformation({ title, message, type }: infoType) {
      (self.title = title), (self.message = message), (self.type = type);
    },
    setLoading(isLoading: boolean){
      
      self.loading = isLoading;
    }
  }));

