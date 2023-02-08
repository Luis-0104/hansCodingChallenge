var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "hanscodingchallenge",
  password: "personPW1!",
  database: "personDB"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  setTimeout(()=>{
    con.destroy()
    console.log("Connection destroyed.")
  },2000)
});