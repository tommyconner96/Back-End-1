const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const welcomeRouter = require("../welcome/welcome-router");
const dinerRouter = require("../diners/diner-router");
const dinerAuthRouter = require("../auth/diner-auth-router");
const operatorRouter = require("../operators/operator-router");
const operatorAuthRouter = require("../auth/operator-auth-router");
const dbConfig = require("../database/config");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(
  session({
    name: "token",
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || "secret",
    cookie: {
      httpOnly: true,
    },
    store: new KnexSessionStore({
      createTable: true,
      knex: dbConfig,
    }),
  })
);

server.use("/", welcomeRouter);
server.use("/diners", dinerRouter);
server.use("/diners/auth", dinerAuthRouter);
server.use("/operators", operatorRouter);
server.use("/operators/auth", operatorAuthRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
