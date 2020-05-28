const express = require("express");
const bcrypt = require("bcryptjs");
const Diners = require("../diners/diner-model");
const { sessions, authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Diners.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    res.status(201).json(await Diners.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Diners.findBy({ username }).first();

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user || !passwordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    req.session.diner = diner;

    res.json({
      message: `Welcome ${diner.username}!`,
    });
  } catch (err) {
    next(err);
  }
});

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
