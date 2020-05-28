exports.up = async function (knex) {
  await knex.schema.createTable("diners", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("location");
    // table.specificType("favorites", "text ARRAY");
  });

  await knex.schema.createTable("operators", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    // table.specificType("truck_id", "integer ARRAY");
  });

  await knex.schema.createTable("trucks", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("cuisine_type").notNullable();
    table.integer("customer_rating");
    table
      .integer("operator_id")
      .references("id")
      .inTable("operators")
      .onDelete("SET NULL");
    // table.specificType("menu_id", "INT []");
  });

  await knex.schema.createTable("menus", (table) => {
    table
      .integer("truck_id")
      .references("id")
      .inTable("trucks")
      .onDelete("SET NULL");
    table
      .integer("operator_id")
      .notNullable()
      .references("id")
      .inTable("operators")
      .onDelete("SET NULL");
    table.string("item_name").notNullable();
    table.string("item_description").notNullable();
    table.float("item_price").notNullable();
    table.specificType("stringarray", "item_photos");
    table.float("customer_ratings");
    table.primary(["truck_id", "operator_id"]);
    // table.specificType("intarray", "customer_ratings_avg");
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
  await knex.schema.dropTableIfExists("menus");
  await knex.schema.dropTableIfExists("trucks");
  await knex.schema.dropTableIfExists("operators");
  await knex.schema.dropTableIfExists("diners");
};
