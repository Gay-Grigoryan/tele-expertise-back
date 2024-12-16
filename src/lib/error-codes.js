"use strict";
exports.__esModule = true;
exports.PRISMA_UNIQUE_ERROR = exports.BAD_REQUEST = exports.INTERNAL_SERVER_ERROR = exports.WRONG_PARAMS = exports.FORBIDDEN = exports.PRISMA_ERROR = exports.CANT_SEND_EMAIL = exports.UNIQUE_ERROR = exports.VALIDATION_ERROR = exports.ITEM_NOT_ALLOWED = exports.ITEM_NOT_FOUND = exports.ITEMS_NOT_FOUND = exports.NOT_AUTHENTICATED = exports.USER_ALREADY_EXISTS = void 0;
exports.USER_ALREADY_EXISTS = {
    message: "User already exists",
    code: 4001
};
exports.NOT_AUTHENTICATED = {
    message: "Not authenticated",
    code: 4010
};
exports.ITEMS_NOT_FOUND = {
    message: "Items not found",
    code: 4041
};
var ITEM_NOT_FOUND = function (item) {
    if (item === void 0) { item = "Item"; }
    return ({
        message: "".concat(item, " not found"),
        code: 4042
    });
};
exports.ITEM_NOT_FOUND = ITEM_NOT_FOUND;
var ITEM_NOT_ALLOWED = function (item) {
    if (item === void 0) { item = "Item"; }
    return ({
        message: "".concat(item, " not allowed"),
        code: 4067
    });
};
exports.ITEM_NOT_ALLOWED = ITEM_NOT_ALLOWED;
var VALIDATION_ERROR = function (message) {
    if (message === void 0) { message = "Validation error"; }
    return ({
        message: message,
        code: 4061
    });
};
exports.VALIDATION_ERROR = VALIDATION_ERROR;
var UNIQUE_ERROR = function (item, key) { return ({
    message: "".concat(item, " has already exists"),
    code: 4062,
    unique_key: key
}); };
exports.UNIQUE_ERROR = UNIQUE_ERROR;
var CANT_SEND_EMAIL = function (reciever) { return ({
    message: "Can't send email to ".concat(reciever),
    code: 5001
}); };
exports.CANT_SEND_EMAIL = CANT_SEND_EMAIL;
var PRISMA_ERROR = function (message) {
    if (message === void 0) { message = "Unknown Error"; }
    return ({
        message: message,
        code: 5005
    });
};
exports.PRISMA_ERROR = PRISMA_ERROR;
exports.FORBIDDEN = {
    message: "Forbidden",
    code: 4030
};
exports.WRONG_PARAMS = {
    message: "Wrong params",
    code: 4060
};
exports.INTERNAL_SERVER_ERROR = {
    message: "Internal server error",
    code: 5000
};
var BAD_REQUEST = function (message) {
    if (message === void 0) { message = "Bad request"; }
    return ({
        message: message,
        code: 4000
    });
};
exports.BAD_REQUEST = BAD_REQUEST;
exports.PRISMA_UNIQUE_ERROR = "P2002";
