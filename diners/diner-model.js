const bcrypt = require("bcryptjs");
const db = require("../database/config");

function find() {
  return db("diners");
}

function findBy(filter) {
  return db("diners").select("id", "username", "password").where(filter);
}

async function add(diner) {
  // hash password with time complexity of 10
  diner.password = await bcrypt.hash(diner.password, 2);
  const [id] = await db("diners").insert(diner);
  return findBy({ id });
}

// function add(diner) {
//   return db("diners")
//     .insert(diner, "id")
//     .then(([id]) => findBy(id));
// }

function remove(id) {
  return db("diners").where({ id }).delete();
}

module.exports = {
  find,
  findBy,
  add,
  remove,
};
