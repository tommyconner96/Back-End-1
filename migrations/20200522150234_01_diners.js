exports.up = async function (knex) {
  await knex.schema.createTable("diners", (diners) => {
    diners.increments();
    diners.string("username").notNullable().unique();

    diners.string("password").notNullable();
    // diners.string("location").notNullable();
    // diners.string("favorite_trucks");
  });

  await knex.schema.createTable("operators", (operators) => {
    operators.increments();
    operators.string("username").notNullable().unique();

    operators.string("password").notNullable();
    // operators.string("password");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("diners");
  await knex.schema.dropTableIfExists("operators");
};
