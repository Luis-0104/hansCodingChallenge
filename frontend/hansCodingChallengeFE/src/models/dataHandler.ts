import { identifier, number } from "mobx-state-tree/dist/internal";
import { customerT } from "./customer";
import { customersT } from "./customers";
import { IRootInstance, useRootStore } from "./root";


export const loadData = (): Promise<customersT> => {
  console.log("Fetching data . . .");
  return getCustomers().then((val) => {
    console.log("Data arrived!");
    return val;
  });
};

export const saveData = (data: customersT) => {
  console.log("Data Saved");
};

const getCustomers = (): Promise<customersT> => {
  try {
    return fetch("http://localhost:3000/api/customers")
      .then((res) => res.json())
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
            el.birth_date = new Date();
            el.last_login = new Date();
          }
        );
        return res as customersT;
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCustomer = (id: number): Promise<customerT> => {
  return fetch(`http://localhost:3000/api/customers/${id}`)
    .then((res) => res.json())
    .then((res) => {
      return res as customerT;
    });
};

const createCustomer = (customer: customerT): void => {
  fetch("http://localhost:3000/api/customers", {
    method: "POST",
    body: JSON.stringify(customer),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
const updateCustomer = (customer: customerT): void => {};


export const deleteCustomer = (
  customer: { id: number } | number
): Promise<boolean> => {
  if (typeof customer != "number") {
    customer = customer.id;
  }
  return fetch(`http://localhost:3000/api/customers/${customer}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((val) => {
    console.log(`Deleted Customer with ID ${customer}`);
    return true;
  });
};
