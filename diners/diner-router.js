const express = require("express");
const Diners = require("./diner-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Welcome to the Diner route!" });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
    next(err);
  }
});

module.exports = router;
