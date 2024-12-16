"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GlobalExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var error_codes_1 = require("../../../../../../../../src/lib/error-codes");
var GlobalExceptionFilter = /** @class */ (function () {
    function GlobalExceptionFilter() {
    }
    GlobalExceptionFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var status = exception.getStatus();
        var exceptionResponse = exception.getResponse();
        // Validation error
        if (isValidationError(exception, exceptionResponse)) {
            delete exceptionResponse.statusCode;
            delete exceptionResponse.error;
            exceptionResponse.code = (0, error_codes_1.VALIDATION_ERROR)().code;
        }
        response.status(status).json({
            meta: {
                error: exceptionResponse,
                status: status
            },
            data: null
        });
    };
    GlobalExceptionFilter = __decorate([
        (0, common_1.Catch)(common_1.HttpException)
    ], GlobalExceptionFilter);
    return GlobalExceptionFilter;
}());
exports.GlobalExceptionFilter = GlobalExceptionFilter;
function isValidationError(exception, exceptionResponse) {
    return ((exception instanceof common_1.NotAcceptableException && "statusCode" in exceptionResponse) ||
        (exception.getStatus() === 400 && exceptionResponse.message === "Unexpected field"));
}
