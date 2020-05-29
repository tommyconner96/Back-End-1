const express = require("express");
const bcrypt = require("bcryptjs");
const Operators = require("../operators/operator-model");
const { sessions, authenticate } = require("../middleware/authenticate");

const router = express.Router();

// REGISTER OPERATOR
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Operators.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }
    console.log(req.body);
    res.status(201).json(await Operators.add(req.body));
  } catch (err) {
    next(err);
  }
});

// LOGIN OPERATOR
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Operators.findBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user || !passwordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    req.session.user = user;

    res.json({
      message: `Welcome ${user.username}!`,
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
