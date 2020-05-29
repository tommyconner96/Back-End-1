const bcrypt = require("bcryptjs");
const db = require("../database/config");

function findBy(filter) {
  return db("diners").select("id", "username", "password").where(filter);
}

async function add(diner) {
  // UPDATE TIME COMPLEXITY FOR PRODUCTION
  diner.password = await bcrypt.hash(diner.password, 2);
  const [id] = await db("diners").insert(diner);
  // The many hours these functions were bugged was b/c
  // findBy needed to see an object and it got passed id by itself
  return findBy({ id });
}

module.exports = {
  findBy,
  add,
};
