import { Instance, onSnapshot, SnapshotIn, types } from "mobx-state-tree";
import { createContext, useContext, useState } from "react";
import { Customers, customersT } from "./customers";
import { loadData, saveData } from "./dataHandler";
const RootModel = types.model({
  customers: Customers,
  searchTerm: types.optional(types.string,""),
  dataLoaded: types.optional(types.boolean,false)
})
.actions((self)=>({
  setSearchTerm(searchTerm:string){
    self.searchTerm = searchTerm;
  },
  setCustomers(customers: customersT){
    self.dataLoaded = true;
    self.customers = Customers.create(customers);
  }
}))
;

//initial Data, get from be now State
// export type dataProps = {
//   customers: customer
// };



let initialState = RootModel.create({
  customers: Customers.create({})
});

const rootStoreInstance = initialState;

onSnapshot(rootStoreInstance, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  // saveData(JSON.stringify(snapshot));
});

export interface IRootInstance extends Instance<typeof RootModel> {}

type RootContext = {
  store: IRootInstance;
};
const RootContext = createContext({ store: rootStoreInstance });

export const useRootStore = () => {
  return useContext(RootContext);
};

export const Provider = RootContext.Provider;
loadData(rootStoreInstance);