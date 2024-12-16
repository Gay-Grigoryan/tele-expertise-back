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
exports.BadRequestTransformationFilter = void 0;
var common_1 = require("@nestjs/common");
var websockets_1 = require("@nestjs/websockets");
var BadRequestTransformationFilter = /** @class */ (function (_super) {
    __extends(BadRequestTransformationFilter, _super);
    function BadRequestTransformationFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BadRequestTransformationFilter.prototype["catch"] = function (exception, host) {
        var response = exception.getResponse();
        var properException = new websockets_1.WsException({ status: common_1.HttpStatus.NOT_ACCEPTABLE, messages: response.message, code: 4061 });
        _super.prototype["catch"].call(this, properException, host);
    };
    BadRequestTransformationFilter = __decorate([
        (0, common_1.Catch)(common_1.BadRequestException)
    ], BadRequestTransformationFilter);
    return BadRequestTransformationFilter;
}(websockets_1.BaseWsExceptionFilter));
exports.BadRequestTransformationFilter = BadRequestTransformationFilter;
