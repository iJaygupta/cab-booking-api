const mongoose = require("mongoose");
const dbConfig = require("./dbconfig");
const Schema = mongoose.Schema;

let driverSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    license_number: { type: String, required: true, unique: true },
    car_number: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: false },
},
    {
        timestamps: true
    });



module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("driver", driverSchema);
};
