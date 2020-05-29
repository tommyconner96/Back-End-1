const bcrypt = require("bcryptjs");
const db = require("../database/config");

function findBy(filter) {
  return db("operators").select("id", "username", "password").where(filter);
}

async function add(operator) {
  // UPDATE TIME COMPLEXITY FOR PRODUCTION
  operator.password = await bcrypt.hash(operator.password, 2);
  const [id] = await db("operators").insert(operator);
  // The many hours these functions were bugged was b/c
  // findBy needed to see an object and it got passed id by itself
  return findBy({ id });
}

function remove(id) {
  return db("operators").where({ id }).delete();
}

module.exports = {
  findBy,
  add,
};
