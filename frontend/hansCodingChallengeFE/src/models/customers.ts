import {
  Instance,
  SnapshotIn,
  SnapshotOrInstance,
  destroy,
  getParent,
  onSnapshot,
  types,
} from "mobx-state-tree";
import { Customer } from "./customer";
import { createCustomer, deleteCustomer, loadData } from "./dataHandler";
import { RootModel } from "./root";
import { useNavigate } from "react-router-dom";
export const Customers = types
  .model({
    customerList: types.optional(types.array(Customer), []),
    selectedCustomer: types.maybe(types.number), //has to be stored with id, because a node cannot exist twice in a state tree
    selectionType: types.maybe(types.enumeration(["edit", "delete"])),
  })
  .actions((self) => ({
    addCustomer(customer: SnapshotOrInstance<typeof Customer>) {
      self.customerList.push(customer);
      createCustomer(customer)
        .then((val) => {
          getParent<typeof RootModel>(self, 1).information.setLoading(false);
          getParent<typeof RootModel>(self, 1).information.setInformation({
            title: "Succes!",
            message: `${customer.first_name} ${customer.last_name} has been added to the system`,
            type: "success",
          });
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
          return new Promise(() => {});
        })
        .catch((err) => {
          getParent<typeof RootModel>(self, 1).information.setLoading(false);
          getParent<typeof RootModel>(self, 1).information.setInformation({
            title: "Error!",
            message: err.toString().slice(6),
            type: "error",
          });
          return new Promise(() => {});
        });
    },
    setCustomers(customers: SnapshotOrInstance<typeof Customer>[]) {
      self.customerList.clear();
      self.customerList.push(...customers);
      setTimeout(() => {
        getParent<typeof RootModel>(self, 1).information.setLoading(false);
      }, 1000); //After Fetching, let the loadingbar stay for 3 seconds, during rendering
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
          .catch((err) => {
            getParent<typeof RootModel>(self, 1).information.setLoading(false);
            getParent<typeof RootModel>(self, 1).information.setInformation({
              title: "Error!",
              message: err.toString().slice(6),
              type: "error",
            });
            return new Promise(() => {});
          })
          .then((val) => {
            console.log(`deleted user: ${c.id} bzw. ${id}: ${val}`);
            if (val) {
              getParent<typeof RootModel>(self, 1).information.setInformation({
                title: "Succes!",
                message: `Deleted ${c.first_name} ${c.last_name} succesfully!`,
                type: "success",
              });
            } else {
              getParent<typeof RootModel>(self, 1).information.setInformation({
                title: "Error!",
                message: `Deleting ${c.first_name} ${c.last_name} failed! Please try again later!`,
                type: "error",
              });
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
    getCustomerWithID(id: number): Instance<typeof Customer> | undefined {
      for (let c of self.customerList) {
        if (c.id == id) {
          return c;
        }
      }
      return undefined;
    },

    getCustomerWithUserName(
      userName: string
    ): SnapshotOrInstance<typeof Customer> | undefined {
      for (let c of self.customerList) {
        if (c.user_name == userName) {
          return c;
        }
      }
      return undefined;
    },
  }));
