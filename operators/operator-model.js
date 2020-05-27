const db = require("../database/config");

function find() {
  return db("operators");
}

function findById(id) {
  return db("operators").where({ id }).first();
}

function add(operator) {
  return db("foodtrucks").insert(operator, "id");
  // .then(([id]) => findById(id));
}

function remove(id) {
  return db("operators").where({ id }).delete();
}

module.exports = {
  find,
  findById,
  add,
  remove,
};
