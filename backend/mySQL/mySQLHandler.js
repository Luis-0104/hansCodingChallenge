var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "hanscodingchallenge",
  password: "personPW1!",
  database: "personDB",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

export function getAllCustomers(callback) {
  con.query("SELECT * from MOCK_DATA", (err, result, fields) => {
    if (err) throw err;
    callback(result);
  });
}

export function getCustomerWithID(id, callback) {
  con.query(
    `SELECT * from MOCK_DATA WHERE id = ${id}`,
    (err, result, fields) => {
      if (err) throw err;
      callback(result[0]);
    }
  );
}

export function createNewCustomer(customer, callback) {
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
values (
		${customer.id},
		'${customer.user_name}',
		'${customer.first_name}',
		'${customer.last_name}',
		'${customer.birth_date}',
		'${customer.email}',
		'${customer.password}',
		'${customer.last_login}'
	);`,
    (err, result) => {
      if (err) throw err;
      callback(c);
    }
  );
}

export function deleteCustomerWithID(id, callback) {
  con.query(`DELETE FROM MOCK_DATA WHERE id = ${id};`, (err, result) => {
    if (err) throw err;
    callback(result.affectedRows == 1); //if its higher: more than 1 was deleted (not possible except sql injection) lower: row to delete didn't exist ->404
  });
}

export function updateCustomer(id, customer, callback) {
  con.query(
    `UPDATE MOCK_DATA SET
            id = ${customer.id},
            user_name = '${customer.user_name}',
            first_name ='${customer.first_name}',
            last_name = '${customer.last_name}',
            birth_date = '${customer.birth_date}',
            email = '${customer.email}',
            password = '${customer.password}',
            last_login = '${customer.last_login}'
        WHERE id=${id}
        ;`,
    (err, result) => {
      if (err) throw err;
      callback((result.affectedRows==1)?c:undefined);
    }
  );
}

// getAllCustomers((result) => {
//   console.log(result[4]);
// });
// getCustomerWithID(12345, (result) => {
//   console.log(result);
// });

// let c = {
//   id: 12345,
//   user_name: "BrotBernd123",
//   first_name: "Bernd",
//   last_name: "DasBaguette",
//   birth_date: "2022-6-27",
//   email: "Bernd@brot.de",
//   password: "IchMag2Brot!",
//   last_login: "2022-05-27 10:07:18",
// };

// deleteCustomerWithID(12345, (result) => {
//   console.log(result);
// });
// createNewCustomer(c, (result) => {
//   console.log(result);
// });

// c.last_name = "DasBrot"
// updateCustomer(12345,c,(result)=>{
//     console.log(result)
// })