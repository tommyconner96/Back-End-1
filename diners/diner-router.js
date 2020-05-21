const express = require("express");
const Diners = require("./diner-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Welcome to the Diner route!" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
