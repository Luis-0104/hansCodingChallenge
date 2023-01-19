import { getParent, types } from "mobx-state-tree";
import { Customers } from "./customers";

export type customerT = {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  email: string;
  password: string;
  last_login: Date;
};

export const Customer = types
  .model({
    id: types.number,
    user_name: types.string,
    first_name: types.string,
    last_name: types.string,
    birth_date: types.Date,
    email: types.string,
    password: types.string,
    last_login: types.optional(types.Date, new Date()),
  })
  .actions((self) => ({
    setId(id: number) {
      self.id = id;
    },
    setUserName(user_name: string) {
      self.user_name = user_name;
    },
    setFirstName(first_name: string) {
      self.first_name = first_name;
    },
    setLastName(last_name: string) {
      self.last_name = last_name;
    },
    setBirthDate(birth_date: Date) {
      self.birth_date = birth_date;
    },
    setEmail(email: string) {
      self.email = email;
    },
    setPassword(password: string) {
      self.password = password;
    },
    remove() {
      getParent<typeof Customers>(self, 2).removeSelectedCustomer(self);
    },
  }));
