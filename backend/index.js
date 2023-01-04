const express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let dh = require("./data/datahandler");

// nothing in root direcory
app.get("/", (req, res) => {
  res.send("Nothing implemented, please checkout ./api");
});

// get all customers
app.get("/api/customers", (req, res) => {
  dh.load().then((val) => {
    res.send(JSON.parse(val));
  });
});

// get one customer with id
app.get("/api/customers/:id", (req, res) => {
  dh.load().then((val) => {
    val = JSON.parse(val);
    customer = val.find((el) => {
      return el.id == req.params.id;
    });

    if (customer) {
      res.send(customer);
    } else {
      res.status(404).send(`Customer with id: ${req.params.id} not found`);
    }
  });
});

// create new customer
app.post("/api/customers", (req, res) => {
  //TODO: check if ID is taken
  dh.load().then((val) => {
    val = JSON.parse(val);
    val.push(req.body);
    dh.save(val);
    console.log(`Posted new Customer:`);
    console.log(req.body);
    res.send(req.body);
  });
});

// update customer
app.put("/api/customers/:id", (req, res) => {
  // Check if the query's ID is the same as the body's
  if (req.params.id != req.body.id) {
    res
      .status(422)
      .send(
        `The Object posted doesn't have the same ID as the one of the Query! `
      );
    return;
  }

  dh.load().then((val) => {
    val = JSON.parse(val);
    customer = val.find((el) => {
      return el.id == req.params.id;
    });

    if (customer) {
      val[
        val.findIndex((el) => {
          return el === customer;
        })
      ] = req.body;
      dh.save(val);
      console.log(`Put new data for Customer with ID: ${customer.id}`);
      console.log(req.body);
      res.send(req.body);
    } else {
      res.status(404).send(`Customer with id: ${req.params.id} not found`);
    }
  });
});
// delete customer
app.delete("/api/customers/:id", (req, res) => {
  dh.load().then((val) => {
    val = JSON.parse(val);
    customer = val.find((el) => {
      return el.id == req.params.id;
    });
    if (customer) {
      val.splice(
        val.findIndex((el) => {
          return el === customer;
        })
      );

      dh.save(val);
      res.send(`The Customer with ID: ${customer.id} was deleted`);
    } else {
      res.status(404).send(`Customer with id: ${req.params.id} not found`);
    }
  });
});
// 404 response
app.use((req, res, next) => {
  res
    .status(404)
    .send("The page you tried to acces wasn't found on the sever! 404\n");
});

// Port is set to env-var EXPRESS_PORT, with port 3000 as default.
const port = process.env.EXPRESS_PORT ? +process.env.EXPRESS_PORT : 3000;

// start server
app.listen(port, () => {
  console.log(`ExpressServer running on port ${port} ...`);
});
