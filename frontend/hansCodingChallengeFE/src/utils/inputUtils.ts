export const getRandomCustomerNumber = (): number => {
  return Math.floor(Math.random() * 90000) + 10000;
};

export const isCustomerNumberValid = (customerNumber: number): boolean => {
  return customerNumber >= 10000 && customerNumber <= 99999;
};

export const isFirstNameValid = (first_name: string): boolean => {
  return first_name.length >= 2 && first_name.length <= 150;
};

export const isLastNameValid = (last_name: string): boolean => {
  return last_name.length >= 2 && last_name.length <= 150;
};
export const isUserNameValid = (user_name: string): boolean => {
    return user_name.length >= 3 && user_name.length <= 30 && /^[A-Za-z0-9]*$/.test(user_name)
  };

export const isEmailAdressValid = (email: string): boolean => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isPasswordValid = (password: string): boolean => {
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
