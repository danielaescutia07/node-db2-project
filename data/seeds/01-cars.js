exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert([
        { vin: 'WDBRF52H76F783280', make: 'Ford', model: 'Escape', mileage: 100502, transmission: 'automatic'},
        { vin: 'JN1BY1AR3BM374797', make: 'Chevrolet', model: 'Tahoe', mileage: 105},
        { vin: 'JH4KA2640GC004861', make: 'Infinity', model: 'QX80', mileage: 8500, transmission: 'automatic'}
    ]);
};