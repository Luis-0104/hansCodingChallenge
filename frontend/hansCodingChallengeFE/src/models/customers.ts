import { destroy, onSnapshot, types } from "mobx-state-tree";
import { Customer, customerT } from "./customer";
export type customersT = customerT[];
export const Customers = types
  .model({
    customerList: types.optional(types.array(Customer), []),
  })
  .actions((self) => ({
    addCustomer(customer: customerT) {
      self.customerList.push(customer);
    },
    setCustomers(customers: customersT){
      self.customerList.clear()
      self.customerList.push(...customers)
    },
    remove(customer: customerT) {
      destroy(customer);
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
