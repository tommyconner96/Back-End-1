exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("operators")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("operators").insert([
        { username: "operator 1", password: "abc123" },
        { username: "operator 2", password: "abc123" },
        { username: "operator 3", password: "abc123" },
      ]);
    });
};
