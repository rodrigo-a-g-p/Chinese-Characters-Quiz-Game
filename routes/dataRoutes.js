const express = require("express");
const router = express.Router();

const { getCSVData, getAllAssets } = require("../controllers/dataController");

router.get("/csv-data/:level", getCSVData);
router.get("/assets/:type", getAllAssets);

module.exports = router;
