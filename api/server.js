const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dinerRouter = require("../diners/diner-router");
const operatorRouter = require("../operators/operator-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/diners", dinerRouter);
server.use("/operators", operatorRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
