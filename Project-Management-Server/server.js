const express = require("express");
const app = express();
const { mongoose } = require("./config/projectManagementDB");
const bodyParser = require("body-parser");
const routes = require('./routes/routes');

/* MIDDLEWARE */

// Load middleware
app.use(bodyParser.json());

// CORS Headers middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );
  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );
  next();
});
app.use('/api', routes);

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
