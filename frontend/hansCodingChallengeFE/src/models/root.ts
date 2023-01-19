import { Instance, onSnapshot, SnapshotIn, types } from "mobx-state-tree";
import { createContext, useContext, useState } from "react";
import { Customers, customersT } from "./customers";
import { loadData, saveData } from "./dataHandler";
import { Info } from "./info";

// Declaring the Root Model.
export const RootModel = types.model({
  customers: Customers,
  information: Info,
});

let initialState = RootModel.create({
  customers: Customers.create({}),
  information: Info.create({})
});

const rootStoreInstance = initialState;

onSnapshot(rootStoreInstance, (snapshot) => {
  console.log("Snapshot: ", snapshot);
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
