exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("menus")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("menus").insert([
        {
          truck_id: 1,
          name: "Taj Mahal",
        },
        {
          truck_id: 2,
          name: "Il Saporis",
        },
        {
          truck_id: 3,
          name: "Pueblo Viejo",
        },
      ]);
    });
};
