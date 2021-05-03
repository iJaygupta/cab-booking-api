const Location = require("../lib/location");



/**
 * service to get near by cabs by given location
 * @param {*} params lattitude, longitude
 */
exports.getNearByCabs = async function (request, response) {
    try {
        let cabs = await Location.getModel().aggregate([
            {
                "$lookup": {
                    "from": "drivers",
                    "localField": "driverId",
                    "foreignField": "_id",
                    "as": "driver"
                }
            }
        ]);

        let passengerLattitude = request.body.latitude;
        let passengerLongitude = request.body.longitude;

        let availableCabs = [];
        cabs.map(cab => {
            let distance = getDistanceFromLatLonInKm(cab.latitude, cab.longitude, passengerLattitude, passengerLongitude);
            if (distance <= 4) {
                availableCabs.push({
                    "name": cab.driver[0].name,
                    "car_number": cab.driver[0].car_number,
                    "phone_number": cab.driver[0].phone_number
                })
            }
        })
        if (availableCabs.length < 1) {
            return response.json({ "message": "No cabs available!" });
        }
        response.json({ availableCabs });
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "reason": error.message
        });
    }

}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}