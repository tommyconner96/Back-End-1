exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("current_location")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("current_location").insert([
        { location: "San Francisco, CA" },
        { location: "New York, NY" },
        { location: "Austin, TX" },
      ]);
    });
};
