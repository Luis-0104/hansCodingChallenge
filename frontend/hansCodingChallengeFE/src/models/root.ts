import { Instance, onSnapshot, SnapshotIn, types } from "mobx-state-tree";
import { createContext, useContext, useState } from "react";
import { Customers, customersT } from "./customers";
import { Info } from "./info";
import { InputForm } from "./inputForm";

// Declaring the Root Model.
export const RootModel = types.model({
  customers: Customers,
  information: Info,
  inputForm: InputForm,
});

let cookieInfo = {};
if (sessionStorage.getItem("information")) {
  cookieInfo = JSON.parse(sessionStorage.getItem("information") as string);
}

let cookieCustomers = {};
if (sessionStorage.getItem("customers")) {
  cookieCustomers = JSON.parse(sessionStorage.getItem("customers") as string);
}


let initialState = RootModel.create({
  customers: Customers.create(cookieCustomers),
  information: Info.create(cookieInfo),
  inputForm: InputForm.create({}),
});
console.log("rootstore")
const rootStoreInstance = initialState;

onSnapshot(rootStoreInstance, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  sessionStorage.setItem("information",JSON.stringify(rootStoreInstance.information))
  sessionStorage.setItem("customers",JSON.stringify(rootStoreInstance.customers))
});

export interface IRootInstance extends Instance<typeof RootModel> {}

type RootContext = {
  store: IRootInstance;
};
const RootContext = createContext({ store: rootStoreInstance });

export const useRootStore = () => {
  return useContext(RootContext);
};

export const RootContextProvider = RootContext.Provider;
