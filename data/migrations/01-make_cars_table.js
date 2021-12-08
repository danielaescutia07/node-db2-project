exports.up = async function (knex) {
  await knex.schema.createTable('cars', table => {
    table.increments('car_id')
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
};
