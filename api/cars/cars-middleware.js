const Car = require('./cars-model');
const yup = require('yup');
const vin = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if (!car) {
      next({ status: 404, message: 'not found'})
    } else {
      req.car = car
      next()
    }
  } catch (err) {
    next(err)
  }
}

//const requirements = 'Vin, make, model and mileage are required';

const carsSchema = yup.object().shape({
  vin: yup.string()
    .trim()
    .required('vin is missing'),
  make: yup.string()
    .trim()
    .required('make is missing'),
  model: yup.string()
    .trim()
    .required('model is missing'),
  mileage: yup.number()
    .required('mileage is missing')
});

const checkCarPayload = async (req, res, next) => {
  try {
    const validated = await carsSchema.validate(req.body)
    req.body = validated
    next()
  } catch (err) {
    next({ status: 400, message: err.errors[0]})
  }
}

const checkVinNumberValid = (req, res, next) => {
  if (vin.validate(req.body.vin)) {
    next()
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existing = await Car.getByVin(req.body.vin)
    if (!existing) {
      next()
    } else {
      next({ status: 400, message: `vin ${req.body.vin} already exists`})
    }
  } catch (err) {
    next(err)
  }
}

const errorHandling = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  errorHandling
}
