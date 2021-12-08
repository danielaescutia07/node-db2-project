const express = require('express');

const Car = require('./cars-model')

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
    errorHandling
} = require('./cars-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})
router.get('/:id', checkCarId, async (req, res, next) => {
    res.json(req.car);
})
router.post('/', async (req, res, next) => {
    res.json('creating new car')
})

router.use(errorHandling);

module.exports = router;