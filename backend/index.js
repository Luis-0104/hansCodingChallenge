import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
import {getCustomerWithID,getAllCustomers,createNewCustomer,deleteCustomerWithID,updateCustomer} from "./mySQL/mySQLHandler.js"

// nothing in root direcory
app.get("/", (req, res) => {
  res.send("Nothing implemented, please checkout ./api");
  console.log(`Sent "Nothing impl." to ${req.hostname} - ${req.ip} `);
});

// get all customers
app.get("/api/customers", (req, res) => {
  getAllCustomers((err, val) => {
    if (err) {
    } else {
      res.send(val);
      console.log(`Sent "Customers" to ${req.hostname} - ${req.ip}`);
    }
  });
});

// get one customer with id
app.get("/api/customers/:id", (req, res) => {
  getCustomerWithID(req.params.id, (err, val) => {
    if (err) {
    } else {
      if (val) {
        res.send(val);
        console.log(
          `Sent "Customer with ID ${req.params.id}" to ${req.hostname} - ${req.ip}`
        );
      } else {
        res.status(404).send(`Customer with id: ${req.params.id} not found`);
        console.log(
          `Sent "404 Customer with ID ${req.params.id} not found" to ${req.hostname} - ${req.ip}`
        );
      }
    }
  });
});

// create new customer
app.post("/api/customers", (req, res) => {
  createNewCustomer(req.body, (err, val) => {
    if (err) {
      res.status(409).send(`${err}`);
      console.log(`Sent "${err}" to ${req.hostname} - ${req.ip}`);
    } else {
      console.log(
        `Posted new customer with ID ${req.params.id} by ${req.hostname} - ${req.ip}`
      );
      console.log(req.body);
      res.send(req.body);
    }
  });
});

// update customer
app.put("/api/customers/:id", (req, res) => {
  updateCustomer(req.params.id, req.body, (err, val) => {
    if (err) {
      console.log(`Sent "${err}" to ${req.hostname} - ${req.ip}`);
      res.status(500).send(val);
    } else {
      if (val) {
        console.log(
          `Put new data to customer with ID ${req.params.id} by ${req.hostname} - ${req.ip}`
        );
        console.log(req.body);
        res.send(req.body);
      } else {
        res.status(404).send(`Customer with id: ${req.params.id} not found`);
        console.log(
          `Sent "404 Customer with ID ${req.params.id} not found" to ${req.hostname} - ${req.ip}`
        );
      }
    }
  });

});

// delete customer
app.delete("/api/customers/:id", (req, res) => {
  deleteCustomerWithID(req.params.id, (err, val) => {
    if (err) {
      res.status(500).send(err);
      console.log(`Sent "${err}" to ${req.hostname} - ${req.ip}`);
    } else {
      if (val) {
        res.header("");
        res.send(`The Customer with ID: ${req.params.id} was deleted`);
        console.log(
          `Deleted customer with ID ${req.params.id} by ${req.hostname} - ${req.ip}`
        );
      } else {
        res.status(404).send(`Customer with id: ${req.params.id} not found`);
        console.log(
          `Sent "404 Customer with ID ${req.params.id} not found" to ${req.hostname} - ${req.ip}`
        );
      }
    }
  });

});
// 404 response
app.use((req, res, next) => {
  res
    .status(404)
    .send("The page you tried to acces wasn't found on the sever! 404\n");
});

/*
// Cors so the api can be easily accessed
const corsOptions = {
  origin: "*",
};
app.use(
  cors({
    origin: "http://localhost",
    optionsSuccessStatus: 200,
  })
);
*/

// Port is set to env-var EXPRESS_PORT, with port 3000 as default.
const port = process.env.EXPRESS_PORT ? +process.env.EXPRESS_PORT : 3000;

// start server
app.listen(port, () => {
  console.log(`ExpressServer running on port ${port} . . .`);
});
