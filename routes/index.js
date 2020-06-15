var express = require("express");
var router = express.Router();

const csvRoutes = require("./csv.routes");

//CSV Router for Provides
router.use("/csv", csvRoutes);

module.exports = router;
