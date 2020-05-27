exports.up = async function (knex) {
  await knex.schema.createTable("diners", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("location");
    table.specificType("intarray", "favorite_truck_id");
  });

  await knex.schema.createTable("operators", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.specificType("intarray", "truck_id");
  });

  await knex.schema.createTable("trucks", (table) => {
    table.increments("id");
    table.string("name").notNullable().unique();
    table.string("cuisine_type").notNullable();
    table.integer("customer_rating");
    table.specificType("intarray", "menu_id");
  });

  await knex.schema.createTable("menus", (table) => {
    table.increments("id");
    table.string("item_name").notNullable().unique();
    table.string("item_description").notNullable().unique();
    table.float("item_price").notNullable();
    table.specificType("stringarray", "item_photos");
    table.float("customer_ratings");
    table.specificType("intarray", "customer_ratings_avg");
  });

  // await knex("trucks").insert({ intarray: [] });
  // await knex('menus').insert({stringarray: [], intarray: []});

  await knex.schema.createTable("current_location", (table) => {
    table.increments("id");
    table.string("location").notNullable();
    table.string("departure_time");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("diners");
  await knex.schema.dropTableIfExists("operators");
  await knex.schema.dropTableIfExists("trucks");
  await knex.schema.dropTableIfExists("menus");
  await knex.schema.dropTableIfExists("current_location");
};
