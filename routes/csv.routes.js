const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });
const { parseCsv, getProvider } = require("../controllers/api/csv.controller");
const provider = require("../config/provider.config");
/**
 * Creates a new client account.
 *
 * @name Create a txt file from a csv
 * @route {POST} api/v1/csv/:providerName
 * @routeparam  {string} providerName - the providerName that sent the file.
 * @bodyparam   {file}  file - The csv file to be sent.
 *
 * @return {Object} PLACEHOLDER
 */

router.post("/upload/:providerName", upload.single("file"), parseCsv);
router.get("/:providerName", getProvider);
module.exports = router;
