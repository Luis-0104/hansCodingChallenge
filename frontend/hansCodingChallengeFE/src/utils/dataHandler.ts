import { SnapshotIn, SnapshotOrInstance, boolean, identifier, number } from "mobx-state-tree/dist/internal";
import { IRootInstance, useRootStore } from "../models/root";
import { Customer } from "../models/customer";
import { dateToSQL } from "./dateFormater";

export const loadData = (): Promise<SnapshotOrInstance<typeof Customer>[] > => {
  console.log("Fetching data . . .");
  return getCustomers().then((val) => {
    console.log("Data arrived!");
    return val;
  });
};



const getCustomers = (): Promise<
SnapshotOrInstance<typeof Customer>[]> => {
  try {
    return fetch("/api/customers")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        throw new Error(
          "Failed to fetch the customers. Please try again later!"
        );
      })
      .then((res) => {
        res.forEach(
          (
            el: any
            // {
            //   id: number;
            //   user_name: string;
            //   first_name: string;
            //   last_name: string;
            //   birth_date: string | Date; //to be converted
            //   email: string;
            //   password: string;
            //   last_login: string | Date ; //to be converted
            // }
          ) => {
            el.birth_date = new Date(el.birth_date);
            el.last_login = new Date(el.last_login);
          }
        );
        return res;
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomer = (id: number): Promise<SnapshotIn<typeof Customer>> => {
  return fetch(`/api/customers/${id}`)
    .then((res) => res.json())
    .then((res) => {
      return res as SnapshotIn<typeof Customer>;
    });
};
export const createCustomer = (customer: SnapshotOrInstance<typeof Customer>): Promise<boolean> => {
  let customerFormated={
    ...customer,
    birth_date : dateToSQL(customer.birth_date),
    last_login: dateToSQL(customer.last_login)
  }
  return fetch("/api/customers", {
    method: "POST",
    body: JSON.stringify(customerFormated),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((val) => {
      console.log(`Created Customer with ID ${customer.id}`);
      if (!val.ok) {
        throw new Error(
          `Creating ${customer.first_name} ${customer.last_name} failed (${val.statusText} - ${val.status})`
        );
      }
      return val.ok;
    })
    .catch((err) => {
      throw new Error(`${err}`);
    });
};
export const updateCustomer = (
  customer: SnapshotIn<typeof Customer>,
  oldID?: number
): Promise<boolean> => {
  if (!oldID) {
    // ID stays the same
    oldID = customer.id;
  }
  let customerFormated={
    ...customer,
    birth_date : dateToSQL(customer.birth_date),
    last_login: dateToSQL(customer.last_login)
  }


  return fetch(`/api/customers/${oldID}`, {
    method: "PUT",
    body: JSON.stringify(customerFormated),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .catch((err) => {
      throw new Error(`${err}`);
    })
    .then((val) => {
      console.log(`Updated Customer ${customer}`);
      if (!val.ok) {
        throw new Error(
          `Updating ${customer.first_name} ${customer.last_name} failed (${val.statusText} - ${val.status})`
        );
      }
      return val.ok;
    });
};

export const deleteCustomer = (
  customer: { id: number } | number
): Promise<boolean> => {
  if (typeof customer != "number") {
    customer = customer.id;
  }
  return fetch(`/api/customers/${customer}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((val) => {
      console.log(`Deleted Customer with ID ${customer}`);
      return val.ok;
    })
    .catch((err) => {
      throw new Error(
        `Failed to delete customer with id ${customer}. Please try again later!`
      );
    });
};
