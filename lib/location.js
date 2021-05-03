const mongoose = require("mongoose");
const dbConfig = require("./dbconfig");
const Schema = mongoose.Schema;

let locationSchema = new Schema({
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "driver" },
    latitude: { type: Number },
    longitude: { type: Number }
},
    {
        timestamps: true
    });



module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("location", locationSchema);
};
