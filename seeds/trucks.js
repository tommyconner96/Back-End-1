exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("trucks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("trucks").insert([
        {
          name: "Taj Mahal",
          cuisine_type: "Indian",
        },
      ]);
    });
};
