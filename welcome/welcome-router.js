const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Welcome to FoodTruck TrakR!" });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong with this route",
    });
    next(err);
  }
});

module.exports = router;
