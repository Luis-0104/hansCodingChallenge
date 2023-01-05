import { destroy, onSnapshot, types } from "mobx-state-tree";
import { Customer, customerT } from "./customer";
export type customersT = customerT[];
export const Customers = types
  .model({
    customers: types.optional(types.array(Customer), []),
  })
  .actions((self) => ({
    addCustomer(customer: customerT) {
      self.customers.push(customer);
    },
    remove(customer: customerT) {
      destroy(customer);
    },
  }))
  .views((self) => ({
    getCustomerWithID(id: number): customerT | undefined {
      for (let c of self.customers) {
        if (c.id == id) {
          return c;
        }
      }
      return undefined;
    },
  }));
