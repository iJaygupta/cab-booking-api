module.exports = {
    getNearByCabs: {
        properties: {
            latitude: { type: ["number"] },
            longitude: { type: ["number"] },
        },
        required: ["latitude", "longitude"],
        additionalProperties: false,
    }
};