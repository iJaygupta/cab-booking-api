
exports.ajvErrors = function (error, callback) {
    errorField = error[0].instancePath;
    errorField = errorField.split("/");
    errorField = errorField[errorField.length - 1];
    var errMsg = errorField + " " + error[0].message;
    return callback(errMsg);
};