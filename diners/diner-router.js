const express = require("express");
const db = require("../database/config");
// const Diners = require("./diner-model");

const router = express.Router({mergeParams: true});

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

// GET DINER BY ID
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

// CREATE DINER
router.post("/", async (req, res, next) => {
  try {
    const [id] = await db("diners").insert(req.body);
    const diner = await db("diners").where({ id }).first();

    res.status(201).json(diner);
  } catch (err) {
    next(err);
  }
});

// UPDATE DINER
router.put("/:id", validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("diners").where({ id }).update(req.body);
    const diner = await db("diners").where({ id }).first();

    res.json(diner);
  } catch (err) {
    next(err);
  }
});

// DELETE DINER
router.delete("/:id", validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("diners").where({ id }).del();

    res.status(201).json({
      message: `Diner ${id} deleted`,
    });
  } catch (err) {
    next(err);
  }
});

function validateUserId() {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const diner = await db("diners").where({ id }).first();

      if (!diner) {
        return res.status(404).json({
          message: "Diner not found",
        });
      }

      req.diner = diner;
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = router;
