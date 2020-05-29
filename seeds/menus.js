exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("menus").del();
  //     .then(function () {
  //       // Inserts seed entries
  //       return knex("menus").insert([
  //         {
  //           item_name: "Tikka Masala",
  //           item_description: "Yummy",
  //           item_price: 11.99,
  //         },
  //         {
  //           item_name: "Vindaloo",
  //           item_description: "Spicy Yummy",
  //           item_price: 11.99,
  //         },
  //       ]);
  //     });
};
