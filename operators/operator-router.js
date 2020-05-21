const express = require("express");
const Operators = require("./operator-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Welcome to the Operator route!" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
