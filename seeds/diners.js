exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("diners")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("diners").insert([
        { username: "diner 1", password: "abc123" },
        { username: "diner 2", password: "abc123" },
        { username: "diner 3", password: "abc123" },
      ]);
    });
};
