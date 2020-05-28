const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const welcomeRouter = require("../welcome/welcome-router");
const dinerRouter = require("../diners/diner-router");
const dinerAuthRouter = require("../auth/diner-auth-router");
const operatorRouter = require("../operators/operator-router");
const operatorAuthRouter = require("../auth/operator-auth-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/", welcomeRouter);
server.use("/diners", dinerRouter);
server.use("/diners", dinerAuthRouter);
server.use("/operators", operatorAuthRouter);
server.use("/operators", operatorRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
