// mongoose package mongodb ORM
const mongoose = require("mongoose");

/**
 * Car model schema.
 */
const carModelSchema = new mongoose.Schema({
  UUID: { type: String, default: "" },
  VIN: { type: String, default: "" },
  Make: { type: String, default: "" },
  Model: { type: String, default: "" },
  Mileage: { type: String, default: "" },
  Year: { type: String, default: "" },
  Price: { type: String, default: "" },
  ZipCode: { type: String, default: "" },
  CreateDate: { type: String, default: "" },
  UpdateDate: { type: String, default: "" },
  provider: { type: String, default: "" },
});

module.exports = mongoose.model("Car", carModelSchema);
