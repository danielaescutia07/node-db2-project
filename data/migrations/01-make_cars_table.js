exports.up = async function (knex) {
  await knex.schema.createTable('cars', table => {
    table.increments('car_id')
    table.string('vin', 17)
      .unique()
      .notNullable()
    table.string('make', 100)
      .notNullable()
    table.string('model', 100)
      .notNullable()
    table.integer('mileage')
      .notNullable()
    table.string('title', 100)
    table.string('transmission', 100)
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
};
