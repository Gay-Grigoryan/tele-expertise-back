"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetTranslationsDto = exports.GetMobileVersionQueryDto = exports.ChangeUserPhoneDto = exports.ChangeUserPasswordDto = exports.UpdateTicketAmount = exports.SeeNotificationDto = void 0;
var class_validator_1 = require("class-validator");
var SeeNotificationDto = /** @class */ (function () {
    function SeeNotificationDto() {
    }
    __decorate([
        (0, class_validator_1.IsNumber)({}, { each: true })
    ], SeeNotificationDto.prototype, "ids");
    return SeeNotificationDto;
}());
exports.SeeNotificationDto = SeeNotificationDto;
var UpdateTicketAmount = /** @class */ (function () {
    function UpdateTicketAmount() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)()
    ], UpdateTicketAmount.prototype, "amount");
    return UpdateTicketAmount;
}());
exports.UpdateTicketAmount = UpdateTicketAmount;
var ChangeUserPasswordDto = /** @class */ (function () {
    function ChangeUserPasswordDto() {
    }
    __decorate([
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], ChangeUserPasswordDto.prototype, "old_password");
    __decorate([
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], ChangeUserPasswordDto.prototype, "password");
    return ChangeUserPasswordDto;
}());
exports.ChangeUserPasswordDto = ChangeUserPasswordDto;
var ChangeUserPhoneDto = /** @class */ (function () {
    function ChangeUserPhoneDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsPhoneNumber)()
    ], ChangeUserPhoneDto.prototype, "phone");
    return ChangeUserPhoneDto;
}());
exports.ChangeUserPhoneDto = ChangeUserPhoneDto;
var GetMobileVersionQueryDto = /** @class */ (function () {
    function GetMobileVersionQueryDto() {
    }
    __decorate([
        (0, class_validator_1.IsIn)(["android", "ios"]),
        (0, class_validator_1.IsNotEmpty)()
    ], GetMobileVersionQueryDto.prototype, "type");
    return GetMobileVersionQueryDto;
}());
exports.GetMobileVersionQueryDto = GetMobileVersionQueryDto;
var GetTranslationsDto = /** @class */ (function () {
    function GetTranslationsDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], GetTranslationsDto.prototype, "text");
    return GetTranslationsDto;
}());
exports.GetTranslationsDto = GetTranslationsDto;
