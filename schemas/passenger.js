module.exports = {
    getNearByCabs: {
        properties: {
            latitude: { type: ["string"] },
            longitude: { type: ["string"] },
        },
        required: ["latitude", "longitude"],
        additionalProperties: false,
    }
};