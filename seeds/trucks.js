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
          operator_id: 1,
        },
        {
          name: "Il Saporis",
          cuisine_type: "Italian",
          operator_id: 2,
        },
        {
          name: "Pueblo Viejo",
          cuisine_type: "Mexican",
          operator_id: 3,
        },
      ]);
    });
};
