"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// DB Connection
require("./database/connection");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PATCH,DELETE",
    credentials: true,
  })
);

app.use(require("./routes"));

if(process.env.NODE_ENV !== "test") {
  var server = app.listen(process.env.PORT, () => {
    console.log("Listing at port ", process.env.PORT);
  });
} else { // for unit testing
  var server = app.listen(0, () => {
    console.log("Listing at port 0");
  });
}

module.exports = server;
