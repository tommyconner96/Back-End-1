const express = require("express");
const db = require("../database/config");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router({ mergeParams: true });

// WELCOME
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

// GET OPERATOR BY ID
router.get("/:id", authenticate(), async (req, res, next) => {
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

// UPDATE OPERATOR
router.put("/:id", authenticate(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await db("operators").where({ id }).update(req.body);
    const operator = await db("operators").where({ id }).first();

    res.json(operator);
  } catch (err) {
    next(err);
  }
});

// DELETE OPERATOR
router.delete("/:id", authenticate(), async (req, res, next) => {
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

// GET OPERATOR'S TRUCKS
router.get(
  "/:id/trucks",
  /*authenticate()*/ async (req, res, next) => {
    try {
      const operatorTrucks = await db("trucks").where(
        "operator_id",
        req.params.id
      );

      if (!operatorTrucks) {
        return res.status(404).json({
          message: "No trucks found",
        });
      }

      res.json(operatorTrucks);
    } catch (err) {
      next(err);
    }
  }
);

// GET TRUCK BY ID
router.get(
  "/:id/trucks/:truck_id",
  /*authenticate()*/ async (req, res, next) => {
    try {
      const truck = await db("trucks")
        .where("operator_id", req.params.id)
        .andWhere("id", req.params.truck_id)
        .first();

      if (!truck) {
        return res.status(404).json({
          message: "Truck not found",
        });
      }

      res.json(truck);
    } catch (err) {
      next(err);
    }
  }
);

// CREATE TRUCK
router.post(
  "/:id/trucks",
  /*authenticate()*/ async (req, res, next) => {
    try {
      const [id] = await db("trucks").insert(req.body);
      const truck = await db("trucks").where({ id }).first();

      res.status(201).json(truck);
    } catch (err) {
      next(err);
    }
  }
);

// UPDATE TRUCK
router.put(
  "/:id/trucks/:truck_id",
  /*authenticate()*/ async (req, res, next) => {
    try {
      await db("trucks")
        .where("id", req.params.truck_id)
        .andWhere("operator_id", req.params.id)
        .update(req.body);
      const truck = await db("trucks").where("id", req.params.truck_id).first();

      res.json(truck);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE TRUCK
router.delete(
  "/:id/trucks/:truck_id",
  /*authenticate()*/
  async (req, res, next) => {
    try {
      await db("trucks")
        .where("id", req.params.truck_id)
        .andWhere("operator_id", req.params.id)
        .del();

      res.status(201).json({
        message: `Truck ${req.params.truck_id} deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET TRUCK MENU
router.get("/trucks/:id/menu", async (req, res, next) => {
  try {
    const menu = await db("menus").where("id", req.params.id).first();

    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    }

    res.json(menu);
  } catch (err) {
    next(err);
  }
});

// ADD MENU
router.post("/trucks/:id/menu", async (req, res, next) => {
  try {
    const [id] = await db("menus").insert(req.body);
    const menu = await db("menus").where({ id }).first();

    res.status(201).json(menu);
  } catch (err) {
    next(err);
  }
});

// GET MENU ITEM
router.get("/trucks/:id/menu/:item_id", async (req, res, next) => {
  try {
    const menuItem = await db("menus").where("id", req.params.item_id).first();

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.json(menuItem);
  } catch (err) {
    next(err);
  }
});

// UPDATE MENU ITEM
router.put(
  "/trucks/:id/menu/:item_id",
  validateUserId(),
  async (req, res, next) => {
    try {
      const { item_id } = req.params;
      await db("menus").where({ item_id }).update(req.body);
      const menuItem = await db("menus").where({ item_id }).first();

      res.json(menuItem);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE MENU ITEM
router.delete(
  "/trucks/:id/menu/:item_id",
  validateUserId(),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await db("menus").where({ item_id }).del();

      res.status(201).json({
        message: `Menu item ${item_.id.item_name} deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
);

// ADD TRUCK LOCATION
router.post("/trucks/:id/location", async (req, res, next) => {
  try {
    const [id] = await db("diners").insert(req.body);
    const diner = await db("diners").where({ id }).first();

    res.status(201).json(diner);
  } catch (err) {
    next(err);
  }
});

// VERIFY THESE ROUTES ARE WORKING CORRECTLY
// UPDATE TRUCK LOCATION
router.put(
  "/trucks/:id/location/:location_id",
  validateUserId(),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await db("diners").where({ id }).update(req.body);
      const diner = await db("diners").where({ id }).first();

      res.json(diner);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE TRUCK LOCATION
router.delete(
  "/trucks/:id/location/:location_id",
  validateUserId(),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await db("diners").where({ id }).del();

      res.status(201).json({
        message: `Diner ${id} deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
);

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
