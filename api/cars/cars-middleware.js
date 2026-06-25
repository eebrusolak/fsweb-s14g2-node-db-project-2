const Cars = require("./cars-model");
const validator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  const car = await Cars.getById(req.params.id);

  if (!car) {
    return res.status(404).json({
      message: `${req.params.id} id car not found`,
    });
  }

  req.car = car;

  next();
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    return res.status(400).json({
      message: "vin is missing",
    });
  }

  if (!make) {
    return res.status(400).json({
      message: "make is missing",
    });
  }

  if (!model) {
    return res.status(400).json({
      message: "model is missing",
    });
  }

  if (mileage === undefined) {
    return res.status(400).json({
      message: "mileage is missing",
    });
  }

  next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;

  if (!validator.validate(vin)) {
    return res.status(400).json({
      message: `vin ${vin} is invalid`,
    });
  }

  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;

  const cars = await Cars.getAll();
  const exists = cars.find((car) => car.vin === vin);

  if (exists) {
    return res.status(400).json({
      message: `vin ${vin} already exists`,
    });
  }

  next();
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};