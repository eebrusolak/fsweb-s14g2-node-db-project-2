const router = require("express").Router();

const Cars = require("./cars-model");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

// GET /api/cars
router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

// GET /api/cars/:id
router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    res.json(req.car);
  } catch (err) {
    next(err);
  }
});

// POST /api/cars
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const car = await Cars.create(req.body);
      res.status(201).json(car);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;