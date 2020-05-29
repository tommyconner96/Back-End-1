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
    name: "token", // overwrites default cookie name, hides our stack better
    resave: false, // avoid recreating sessions if they haven't changed
    saveUninitialized: false, // GDPR laws against setting cookies automatically
    secret: process.env.COOKIE_SECRET || "secret", // cryptographically sign the cookie
    cookie: {
      httpOnly: true, // disallow JS to read cookie content
      //   maxAge: 60 * 1000, // expires the cookie after 60 seconds
    },
    store: new KnexSessionStore({
      createTable: true, // if the session table doesn't exist, create automatically
      knex: dbConfig, // configured instance of knex
    }),
  })
);

server.use("/", welcomeRouter);
server.use("/diners", dinerRouter);
server.use("/diners", dinerAuthRouter);
server.use("/operators/auth", operatorAuthRouter);
server.use("/operators", operatorRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
