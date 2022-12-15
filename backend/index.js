const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Nothing implemented, please checkout ./api");
});
app.get("/api/persons", (req, res) => {
  res.send(
    `you requested with ip ${req.ip} the query: ${req.query.a}`
  );
});
app.listen(3000, () => {
  console.log("ExpressServer running on port 3000");
});
