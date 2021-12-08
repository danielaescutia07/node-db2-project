exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert([
        { vin: 1234567890, make: 'Ford', model: 'Escape', mileage: 100502, transmission: 'automatic'},
        { vin: 1397373392, make: 'Chevrolet', model: 'Tahoe', mileage: 105},
        { vin: 1739883740, make: 'Infinity', model: 'QX80', mileage: 8500, transmission: 'automatic'}
    ]);
};