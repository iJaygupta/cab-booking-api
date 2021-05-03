var express = require('express');
var router = express.Router();
const PassengerController = require("../controllers/passenger");
const { validateAjv } = require("../lib/validator");
const { getNearByCabs } = require("../schemas/passenger");

/* GET available cabs listing. */
router.post("/available_cabs", validateAjv(getNearByCabs), PassengerController.getNearByCabs);

module.exports = router;