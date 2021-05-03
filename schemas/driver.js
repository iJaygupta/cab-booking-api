module.exports = {

    registerDriver: {
        properties: {
            name: { type: ["string"], minLength: 1 },
            email: { type: ["string"], minLength: 1 },
            phone_number: { type: ["number"], minLength: 10 },
            license_number: { type: ["string"], minLength: 1 },
            car_number: { type: ["string"], minLength: 1 },
        },
        required: ["name", "email", "phone_number", "license_number", "car_number"],
        additionalProperties: false,
    },

    shareDriverLocation: {
        properties: {
            latitude: { type: ["string"] },
            longitude: { type: ["string"] },
        },
        required: ["latitude", "longitude"],
        additionalProperties: false,
    }
};