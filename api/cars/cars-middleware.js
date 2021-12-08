const Car = require('./cars-model');
const yup = require('yup');

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

const requirements = 'Vin, make, model and mileage are required';

const carsSchema = yup.object().shape({
  vin: yup.string()
    .typeError('Vin is missing')
    .trim()
    .required(requirements),
  make: yup.string()
    .typeError('Make is missing')
    .trim()
    .required(requirements),
  model: yup.string()
    .typeError('Model is missing')
    .trim()
    .required(requirements),
  mileage: yup.number()
    .typeError('Mileage is missing')
    .required(requirements)
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
  next()
}

const checkVinNumberUnique = (req, res, next) => {
  next()
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
