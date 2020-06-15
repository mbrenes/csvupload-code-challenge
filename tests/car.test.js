// const mongoose = require("mongoose");

const dbHandler = require("./db-handler");
const carService = require("../utils/storeDB");
const carHandler = require("./car-handler");
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Car test suite.
 */
describe("car ", () => {
  /**
   * Tests that a valid car can be created through the carService without throwing any errors.
   */
  it("can be created correctly", async () => {
    expect(async () => await carHandler.parseCsv("tmp/csv/cars.csv", "volvo")).not.toThrow();
  });
});

/**
 * Complete car example.
 */
// var carComplete = {
//     UUID: "1234",
//     VIN: "1234",
//     Make: "1234",
//     Model: "1234",
//     Mileage: "1234",
//     Year: "1234",
//     Price: "1234",
//     ZipCode: "1234",
//     CreateDate: "1234",
//     UpdateDate: "1234",
// };
