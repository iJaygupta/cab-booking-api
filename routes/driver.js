var express = require("express");
const DriverController = require("../controllers/driver");
const { validateAjv } = require("../lib/validator");
const { registerDriver, shareDriverLocation } = require("../schemas/driver");



var router = express.Router();

router.post("/register", validateAjv(registerDriver), DriverController.registerDriver);
router.post("/:id/sendLocation", validateAjv(shareDriverLocation), DriverController.shareDriverLocation);



module.exports = router;