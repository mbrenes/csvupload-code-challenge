const carModel = require("../models/car.model");
const create = async (car) => {
  if (!car) throw new Error("Missing car");
  await carModel.create(car);
};
const findProviderStuff = async (provider) => {
  return new Promise((resolve, reject) => {
    carModel.find({ provider: provider }).then((data) => resolve(data));
  });
};

module.exports = {
  create,
  findProviderStuff,
};
