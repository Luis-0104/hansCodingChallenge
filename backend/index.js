const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let dh = require("./data/datahandler");

// nothing in root direcory
app.get("/", (req, res) => {
  res.send("Nothing implemented, please checkout ./api");
  console.log(`Sent "Nothing impl." to ${req.hostname} - ${req.ip} `);
});

// get all customers
app.get("/api/customers", (req, res) => {
  dh.load().then((val) => {
    // setTimeout(()=>{

    //   res.send(JSON.parse(val));
    // }, 2500)
    res.send(JSON.parse(val));

    console.log(`Sent "Customers" to ${req.hostname} - ${req.ip}`);
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
      console.log(
        `Sent "Customer with ID ${req.params.id}" to ${req.hostname} - ${req.ip}`
      );
    } else {
      res.status(404).send(`Customer with id: ${req.params.id} not found`);
      console.log(
        `Sent "404 Customer with ID ${req.params.id} not found" to ${req.hostname} - ${req.ip}`
      );
    }
  });
});

// create new customer
app.post("/api/customers", (req, res) => {
  if(req.params.id<10000||req.params.id>99999){
    res.status(422).send(`Invalid ID`);
    console.log(` Sent "Ivalid ID ${req.params.id}" to ${req.hostname} - ${req.ip}`)
  }
  //TODO: check if ID is taken
  dh.load().then((val) => {
    val = JSON.parse(val);
    val.push(req.body);
    dh.save(val);
    console.log(
      `Posted new customer with ID ${req.params.id} by ${req.hostname} - ${req.ip}`
    );
    console.log(req.body);
    res.send(req.body);
  });
});

// update customer
app.put("/api/customers/:id", (req, res) => {
  

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
  });
});

// delete customer
app.delete("/api/customers/:id", (req, res) => {
  setTimeout(()=>{
     dh.load().then((val) => {
    val = JSON.parse(val);
    customer = val.find((el) => {
      return el.id == req.params.id;
    });
    if (customer) {
      val.splice(
        val.findIndex((el) => {
          return el === customer;
        }),
        1
      );

      dh.save(val);
      res.header("");
      res.send(`The Customer with ID: ${customer.id} was deleted`);
      console.log(
        `Deleted customer with ID ${req.params.id} by ${req.hostname} - ${req.ip}`
      );
    } else {
      res.status(404).send(`Customer with id: ${req.params.id} not found`);
      console.log(
        `Sent "404 Customer with ID ${req.params.id} not found" to ${req.hostname} - ${req.ip}`
      );
    }
  });
  }, 1000)
 
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
