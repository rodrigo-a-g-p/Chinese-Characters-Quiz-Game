const express = require("express");
const router = express.Router();

const { getGame } = require("../controllers/viewsController");

router.get("/", getGame);

module.exports = router;
