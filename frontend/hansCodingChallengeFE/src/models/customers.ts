import { SnapshotIn, destroy, onSnapshot, types } from "mobx-state-tree";
import { Customer, customerT } from "./customer";
import { deleteCustomer } from "./dataHandler";
export type customersT = customerT[];
export const Customers = types
  .model({
    customerList: types.optional(types.array(Customer), []),
    selectedCustomer: types.maybe(types.number), //has to be stored with id, because a node cannot exist twice in a state tree
    selectionType: types.maybe(types.enumeration(["edit", "delete"])),
  })
  .actions((self) => ({
    addCustomer(customer: customerT) {
      self.customerList.push(customer);
    },
    setCustomers(customers: customersT) {
      self.customerList.clear();
      self.customerList.push(...customers);
    },
    removeSelectedCustomer() {
      if (self.selectedCustomer) {
        deleteCustomer(self.selectedCustomer);
      }
    },
    selectCustomerToDelete(id: number) {
      // loop through list to check if the id really leads to a customer
      for (let c of self.customerList) {
        if (c.id == id) {
          self.selectedCustomer = id;
          self.selectionType = "delete";
          console.log("selected to delete: " + id);
          return;
        }
      }
      
    },
    selectCustomerToEdit(id: number) {
      for (let c of self.customerList) {
        if (c.id == id) {
          self.selectedCustomer = id;
          self.selectionType = "edit";
          console.log("selected to edit: " + id);
          return;
        }
      }
    },
    resetSelection() {
      self.selectedCustomer = undefined;
      self.selectionType = undefined;
    },
  }))

  .views((self) => ({
    getCustomerWithID(id: number): customerT | undefined {
      for (let c of self.customerList) {
        if (c.id == id) {
          return c;
        }
      }
      return undefined;
    },
  }));
