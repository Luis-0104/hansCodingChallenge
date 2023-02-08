import bcrypt from "bcrypt";

async function encrypt(pw) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(pw, salt);
  return hashedPassword
}

async function compare(pwClear,pwHashed){
    return bcrypt.compare(pwClear,pwHashed)
}

export async function encryptWithCustomer(customer){
    const salt = await bcrypt.genSalt();
    customer.password = await bcrypt.hash(customer.password, salt)
    return customer
}