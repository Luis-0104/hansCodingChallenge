export const getRandomCustomerNumber = (): number => {
  return Math.floor(Math.random() * 90000) + 10000;
};
import { inputElementIDType } from "./../models/inputElement";

export const validateInput = ({
  id,
  val,
}: {
  id: inputElementIDType;
  val: string | number;
}): { helpText: string; valid: boolean } => {
  let helpText = "";
  let valid = false;
  if (id == "customer_number") {
    valid = isCustomerNumberValid(+val);
    if (!valid) {
      helpText = `CustomerNumber invalid. Please Choose a 5 digit value.`;
    }
  } else if (id == "first_name") {
    valid = isFirstNameValid(val.toString());
    if (!valid) {
      helpText = `First Name invalid. Please choose a name with 2-150 characters.`;
    }
  } else if (id == "last_name") {
    valid = isLastNameValid(val.toString());
    if (!valid) {
      helpText = `Last Name invalid. Please choose a name with 2-150 characters.`;
    }
  } else if (id == "user_name") {
    valid = isUserNameValid(val.toString());
    if (!valid) {
      helpText = `UserName invalid. Please choose a name with 3 - 30 characters, only using letters.`;
    }
  } else if (id == "email") {
    valid = isEmailAdressValid(val.toString());
    if (!valid) {
      helpText = `Email invalid. Please choose a valid email-adress.`;
    }
  } else if (id == "password") {
    valid = isPasswordValid(val.toString());
    if (!valid) {
      helpText = `Password invalid. Please choose a secure password with 8-15 characters, at least one capital letter and one special Character.`;
    }
  } else if (id == "repeat_password") {
    valid = true;
  }
  return { helpText, valid };
};

const isCustomerNumberValid = (customerNumber: number): boolean => {
  return customerNumber >= 10000 && customerNumber <= 99999;
};

const isFirstNameValid = (first_name: string): boolean => {
  return first_name.length >= 2 && first_name.length <= 150;
};

const isLastNameValid = (last_name: string): boolean => {
  return last_name.length >= 2 && last_name.length <= 150;
};
const isUserNameValid = (user_name: string): boolean => {
  return (
    user_name.length >= 3 &&
    user_name.length <= 30 &&
    /^[A-Za-z0-9]*$/.test(user_name)
  );
};

const isEmailAdressValid = (email: string): boolean => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isPasswordValid = (password: string): boolean => {
  if (
    password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    )
  ) {
    return true;
  } else {
    return false;
  }
};
