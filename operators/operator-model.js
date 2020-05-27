const db = require("../database/config");

function find() {
  return db("operators");
}

function findById(id) {
  return db("operators").where({ id }).first();
}

function add(shout) {
  return db("operators")
    .insert(shout, "id")
    .then(([id]) => findById(id));
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
