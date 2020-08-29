const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Diners = require("../diners/diner-model");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// REGISTER DINER
router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Diners.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }
    // console.log(req.body);
    res.status(201).json(await Diners.add(req.body));
  } catch (err) {
    next(err);
  }
});

// LOGIN DINER
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Diners.findBy({ username }).first();
    // console.log(req.body);
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user || !passwordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // req.session.user = user;

    res.json({
      message: `Welcome ${user.username}!`, user_id: user.id
    });
  } catch (err) {
    next(err);
  }
});

// LOGOUT
router.get("/logout", authenticate(), (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "Successfully logged out",
      });
    }
  });
});

module.exports = router;
