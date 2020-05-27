const express = require("express");
const db = require("../database/config");
// const Diners = require("./diner-model");

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

router.get("/:id", async (req, res, next) => {
  try {
    const diner = await db("diners").where("id", req.params.id).first();

    if (!diner) {
      return res.status(404).json({
        message: "Diner not found",
      });
    }

    res.json(diner);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
