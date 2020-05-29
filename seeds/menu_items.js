exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("menu_items")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("menu_items").insert([
        {
          // menu_id: 1,
          item_name: "Tikka Masala",
          item_description: "Yummy",
          item_price: 11.99,
        },
        {
          // menu_id: 1,
          item_name: "Vindaloo",
          item_description: "Spicy yummy",
          item_price: 13.99,
        },
        {
          // menu_id: 2,
          item_name: "Fettucine Alfredo",
          item_description: "Tasty sauce",
          item_price: 14.99,
        },
        {
          // menu_id: 2,
          item_name: "Penne Ala Vodka",
          item_description: "Drunky sauce",
          item_price: 15.99,
        },
        {
          // menu_id: 3,
          item_name: "Chimichanga",
          item_description: "Chubby time",
          item_price: 12.99,
        },
        {
          // menu_id: 3,
          item_name: "Street Tacos",
          item_description: "Street time",
          item_price: 9.99,
        },
      ]);
    });
};
