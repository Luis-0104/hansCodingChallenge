import { customerT } from "./customer";
import { customersT } from "./customers";
import { useRootStore } from "./root";

export const loadData = (store: any) => {
  console.log("Fetching data . . .");
  getCustomers().then((val) => {
    console.log("Data arrived");
    store.setCustomers(val);
  });
};

export const saveData = (data: customersT) => {
  //
};

const getCustomers = (): Promise<customersT> => {
  try {
    return fetch("http://localhost:3000/api/customers")
      .then((res) => res.json())
      .then((res) => {
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
const deleteCustomer = (customer: customerT): void => {};
