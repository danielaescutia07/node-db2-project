const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars').where('car_id', id).first()
}

const create = () => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create
}