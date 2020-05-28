const express = require("express");
const db = require("../database/config");
// const Operators = require("./operator-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Welcome to the Operator route!" });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const operator = await db("operators").where("id", req.params.id).first();

    if (!operator) {
      return res.status(404).json({
        message: "Operator not found",
      });
    }

    res.json(operator);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const [id] = await db("operators").insert(req.body);
    const operator = await db("operators").where({ id }).first();

    res.status(201).json(operator);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("operators").where({ id }).update(req.body);
    const operator = await db("operators").where({ id }).first();

    res.json(operator);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("operators").where({ id }).del();

    res.status(201).json({
      message: `Operator ${id} deleted`,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/trucks", async (req, res, next) => {
  try {
    const [id] = await db("trucks").insert(req.body);
    const menu = await db("trucks").where({ id }).first();

    res.status(201).json(menu);
  } catch (err) {
    next(err);
  }
});

router.put("/trucks/:id", validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("trucks").where({ id }).update(req.body);
    const menu = await db("trucks").where({ id }).first();

    res.json(menu);
  } catch (err) {
    next(err);
  }
});

router.delete("/trucks/:id", validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("trucks").where({ id }).del();

    res.status(201).json({
      message: `Truck ${id} deleted`,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/menus", async (req, res, next) => {
  try {
    const [id] = await db("menus").insert(req.body);
    const menu = await db("menus").where({ id }).first();

    res.status(201).json(menu);
  } catch (err) {
    next(err);
  }
});

router.put("/menus/:id", validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("menus").where({ id }).update(req.body);
    const menu = await db("menus").where({ id }).first();

    res.json(menu);
  } catch (err) {
    next(err);
  }
});

router.delete("/menus/:id", validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("menus").where({ id }).del();

    res.status(201).json({
      message: `Truck ${id} deleted`,
    });
  } catch (err) {
    next(err);
  }
});

function validateUserId() {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const operator = await db("operators").where({ id }).first();

      if (!operator) {
        return res.status(404).json({
          message: "Operator not found",
        });
      }

      req.operator = operator;
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = router;
