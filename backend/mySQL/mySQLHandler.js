import mysql from "mysql2";
import { encryptWithCustomer } from "./passwordManager.js";

var con = mysql.createConnection({
  host: "localhost",
  user: "hanscodingchallenge",
  password: "personPW1!",
  database: "personDB",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to DataBase!");
});

export function getAllCustomers(callback) {
  con.query("SELECT * from MOCK_DATA", (err, result, fields) => {
    if (err) {
      console.error(`Error: ${err.message}`);
    }
    callback(err, result);
  });
}

export function getCustomerWithID(id, callback) {
  con.query(
    "SELECT * from MOCK_DATA WHERE id = ?",
    [id],
    (err, result, fields) => {
      if (err) {
        console.error(`Error: ${err.message}`);
      }
      callback(err, result[0]);
    }
  );
}

export function createNewCustomer(customer, callback) {
  encryptWithCustomer(customer).then((customer)=>{
     con.query(
    `insert into MOCK_DATA (
		id,
		user_name,
		first_name,
		last_name,
		birth_date,
		email,
		password,
		last_login
	)
values (?,?,?,?,?,?,?,?);`,
    [
      customer.id,
      customer.user_name,
      customer.first_name,
      customer.last_name,
      customer.birth_date,
      customer.email,
      customer.password,
      customer.last_login,
    ],
    (err, result) => {
      if (err) {
        console.error(`Error: ${err.message}`);
      }
      callback(err, result);
    }
  );
  })
 
}

export function deleteCustomerWithID(id, callback) {
  con.query(`DELETE FROM MOCK_DATA WHERE id = ?;`, [id], (err, result) => {
    if (err) {
      console.error(`Error: ${err.message}`);
    }
    callback(err, result.affectedRows == 1); //if its higher: more than 1 was deleted (not possible except sql injection) lower: row to delete didn't exist ->404
  });
}

export function updateCustomer(id, customer, callback) {
  encryptWithCustomer(customer).then((customer)=>{
  con.query(
    `UPDATE MOCK_DATA SET
            id = ?,
            user_name = ?, 
            first_name = ?,
            last_name = ?,
            birth_date = ?,
            email = ?,
            password = ?, 
            last_login = ?
        WHERE id = ?
        ;`,
    [
      customer.id,
      customer.user_name,
      customer.first_name,
      customer.last_name,
      customer.birth_date,
      customer.email,
      customer.password,
      customer.last_login,
      customer.id,
    ],
    (err, result) => {
      if (err) {
        console.error(`Error: ${err.message}`);
      }
      callback(
        err,
        result ? (result.affectedRows == 1 ? customer : undefined) : undefined
      );
    }
  );
  })
}

