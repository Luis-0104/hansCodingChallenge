import {
  SnapshotIn,
  destroy,
  getParent,
  onSnapshot,
  types,
} from "mobx-state-tree";
import { Customer, customerT } from "./customer";
import { deleteCustomer, loadData } from "./dataHandler";
import { RootModel } from "./root";
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
        let c: SnapshotIn<typeof Customer>;
        const id = self.selectedCustomer;
        for (c of self.customerList) {
          if (c.id == id) {
            break;
          }
        }
        
        deleteCustomer(self.selectedCustomer)
          .then((val) => {
            console.log(`deleted user: ${c.id} bzw. ${id}`)
            if (val) {
              getParent<typeof RootModel>(self, 1).information.setInformation({
                title: "Succes!",
                message: `Deleted ${c.first_name} ${c.last_name} succesfully!`,
                type: "succes",
              });
            }else{
              //TODO: Eleganter weg, um bei einer Fehlgeschlagenen Request den Error oben anzuzeigen
            }
          })
          // after the deletion the data gets synced again to provide consistency
          .then(loadData)
          .then((val) => {
            getParent<typeof RootModel>(self, 1).customers.setCustomers(val);
          });
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
