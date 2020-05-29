exports.up = async function (knex) {
  await knex.schema.createTable("diners", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("location");
    table.string("favorite_trucks");
  });

  await knex.schema.createTable("operators", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("trucks_owned");
  });

  await knex.schema.createTable("trucks", (table) => {
    table.increments("id");
    table
      .integer("operator_id")
      .references("id")
      .inTable("operators")
      .onDelete("SET NULL");
    table.string("name").notNullable();
    table.string("image URL");
    table.string("cuisine_type").notNullable();
    table.integer("customer_rating");
    table.integer("customer_ratings_avg");
    table.string("menu");
  });

  await knex.schema.createTable("menus", (table) => {
    table.increments("id");
    table
      .integer("truck_id")
      .references("id")
      .inTable("trucks")
      .onDelete("SET NULL");
    table.string("name").notNullable();
    // THIS OPERATOR_ID SHOULD BE RETURNED IN THE QUERY
    // table
    //   .integer("operator_id")
    //   .notNullable()
    //   .references("id")
    //   .inTable("operators")
    //   .onDelete("SET NULL");
    table.string("menu_items");
  });

  await knex.schema.createTable("menu_items", (table) => {
    table.increments("id");
    table
      .integer("menu_id")
      .references("id")
      .inTable("menus")
      .onDelete("SET NULL");
    table.string("item_name").notNullable();
    table.string("item_description").notNullable();
    table.float("item_price").notNullable();
    table.string("item_photo_URL");
    table.float("customer_ratings");
    table.float("customer_rating_avg");
  });

  await knex.schema.createTable("current_location", (table) => {
    table.increments("id");
    table
      .integer("truck_id")
      .references("id")
      .inTable("trucks")
      .onDelete("SET NULL");
    table.string("location").notNullable();
    table.string("departure_time");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("current_location");
  await knex.schema.dropTableIfExists("menu_items");
  await knex.schema.dropTableIfExists("menus");
  await knex.schema.dropTableIfExists("trucks");
  await knex.schema.dropTableIfExists("operators");
  await knex.schema.dropTableIfExists("diners");
};
