exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("current_location")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("current_location").insert([
        { truck_id: 1, location: "San Francisco, CA" },
        { truck_id: 2, location: "New York, NY" },
        { truck_id: 3, location: "Austin, TX" },
      ]);
    });
};
