import { Instance, onSnapshot, types } from "mobx-state-tree";
import { createContext, useContext, useState } from "react";
const RootModel = types.model({});

//initial Data, get from be now State
const [loadData, saveData] = useState(JSON.stringify({

}));


let initialState = RootModel.create(JSON.parse(loadData));

const rootStoreInstance = initialState;

onSnapshot(rootStoreInstance, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  saveData(JSON.stringify(snapshot));
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

