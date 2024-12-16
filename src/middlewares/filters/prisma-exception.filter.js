"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrismaClientExceptionFilter = void 0;
var error_codes_1 = require("./../../lib/error-codes");
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var global_exception_filter_1 = require("./global-exception.filter");
var PrismaClientExceptionFilter = /** @class */ (function (_super) {
    __extends(PrismaClientExceptionFilter, _super);
    function PrismaClientExceptionFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrismaClientExceptionFilter.prototype["catch"] = function (exception, host) {
        var http_exception;
        console.log(exception);
        switch (exception.code) {
            case "P2002": {
                http_exception = new common_1.HttpException((0, error_codes_1.UNIQUE_ERROR)("Item", exception.meta.target), common_1.HttpStatus.NOT_ACCEPTABLE);
                break;
            }
            case "P2003": {
                http_exception = new common_1.HttpException((0, error_codes_1.ITEM_NOT_ALLOWED)(exception.meta.field_name), common_1.HttpStatus.NOT_ACCEPTABLE);
                break;
            }
            case "P2025": {
                http_exception = new common_1.HttpException((0, error_codes_1.ITEM_NOT_FOUND)(), common_1.HttpStatus.NOT_FOUND);
                break;
            }
            default:
                // default 500 error code
                http_exception = new common_1.HttpException((0, error_codes_1.PRISMA_ERROR)(), common_1.HttpStatus.BAD_GATEWAY);
        }
        _super.prototype["catch"].call(this, http_exception, host);
    };
    PrismaClientExceptionFilter = __decorate([
        (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
    ], PrismaClientExceptionFilter);
    return PrismaClientExceptionFilter;
}(global_exception_filter_1.GlobalExceptionFilter));
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter;
