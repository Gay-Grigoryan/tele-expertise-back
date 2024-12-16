"use strict";
exports.__esModule = true;
exports.ResponseFormInterceptor = void 0;
var rxjs_1 = require("rxjs");
var ResponseFormInterceptor = /** @class */ (function () {
    function ResponseFormInterceptor() {
    }
    ResponseFormInterceptor.prototype.intercept = function (context, next) {
        var status = context.switchToHttp().getResponse().statusCode;
        return next.handle().pipe((0, rxjs_1.map)(function (rsp) { return ({
            meta: {
                error: null,
                status: status
            },
            data: rsp || {}
        }); }));
    };
    return ResponseFormInterceptor;
}());
exports.ResponseFormInterceptor = ResponseFormInterceptor;
