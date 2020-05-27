const db = require("../database/config");

function find() {
  return db("diners");
}

function findById(id) {
  return db("diners").where({ id }).first();
}

function add(diner) {
  return db("diners")
    .insert(diner, "id")
    .then(([id]) => findById(id));
}

function remove(id) {
  return db("diners").where({ id }).delete();
}

module.exports = {
  find,
  findById,
  add,
  remove,
};
