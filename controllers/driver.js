const Driver = require("../lib/driver");
const Location = require("../lib/location");
const mongoose = require("mongoose");


/**
 * service to add driver 
 * @param {*} params name, email, phone_number, license_number, car_number
 */
exports.registerDriver = async function (request, response) {
    try {
        let data = request.body;
        if (String(data.phone_number).length != 10) {
            return response.status(400).json({
                "status": "failure",
                "reason": "phone number should be of 10 digits"
            });
        }
        if (await Driver.getModel().findOne({ email: data.email })) {
            return response.status(400).json({
                "status": "failure",
                "reason": "email already registered"
            });
        }
        if (await Driver.getModel().findOne({ phone_number: data.phone_number })) {
            return response.status(400).json({
                "status": "failure",
                "reason": "phone number already registered"
            });
        }
        if (await Driver.getModel().findOne({ license_number: data.license_number })) {
            return response.status(400).json({
                "status": "failure",
                "reason": "license number already registered"
            });
        }
        if (await Driver.getModel().findOne({ car_number: data.car_number })) {
            return response.status(400).json({
                "status": "failure",
                "reason": "car number already registered"
            });
        }
        let res = await Driver.getModel().insertMany(data);
        response.status(201).json(
            {
                "id": res[0]._id,
                "name": res[0].name,
                "email": res[0].email,
                "phone_number": res[0].phone_number,
                "license_number": res[0].license_number,
                "car_number": res[0].car_number
            }
        );
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "reason": error.message
        });
    }

}


/**
 * service to add driver's location
 * @param {*} params driverId, lattitude, longitude
 */
exports.shareDriverLocation = async function (request, response) {
    try {
        let latitude = Number(request.body.latitude);
        let longitude = Number(request.body.longitude);

        let data = {
            driverId: mongoose.Types.ObjectId(request.params.id),
            latitude,
            longitude
        }
        await Location.getModel().insertMany(data);
        response.status(202).json({ "status": "success" });
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "reason": error
        });
    }

}
