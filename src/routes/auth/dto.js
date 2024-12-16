"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangePasswordDto = exports.ConfirmCodeDto = exports.SendCodeDto = exports.CompanyRegisterFilesDto = exports.CompanyRegisterDto = exports.CustomerRegisterFilesDto = exports.CustomerRegisterDto = exports.LoginDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var LoginDto = /** @class */ (function () {
    function LoginDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)()
    ], LoginDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MinLength)(8)
    ], LoginDto.prototype, "password");
    return LoginDto;
}());
exports.LoginDto = LoginDto;
var CustomerRegisterDto = /** @class */ (function () {
    function CustomerRegisterDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(127)
    ], CustomerRegisterDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)()
    ], CustomerRegisterDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsPhoneNumber)()
    ], CustomerRegisterDto.prototype, "phone");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MinLength)(8)
    ], CustomerRegisterDto.prototype, "password");
    return CustomerRegisterDto;
}());
exports.CustomerRegisterDto = CustomerRegisterDto;
var CustomerRegisterFilesDto = /** @class */ (function () {
    function CustomerRegisterFilesDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], CustomerRegisterFilesDto.prototype, "avatar");
    return CustomerRegisterFilesDto;
}());
exports.CustomerRegisterFilesDto = CustomerRegisterFilesDto;
var CompanyRegisterDto = /** @class */ (function () {
    function CompanyRegisterDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(127)
    ], CompanyRegisterDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)()
    ], CompanyRegisterDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsPhoneNumber)()
    ], CompanyRegisterDto.prototype, "phone");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], CompanyRegisterDto.prototype, "tin");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MinLength)(8)
    ], CompanyRegisterDto.prototype, "password");
    return CompanyRegisterDto;
}());
exports.CompanyRegisterDto = CompanyRegisterDto;
var CompanyRegisterFilesDto = /** @class */ (function () {
    function CompanyRegisterFilesDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], CompanyRegisterFilesDto.prototype, "avatar");
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return (Array.isArray(value) ? value : [value]);
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsString)({ each: true })
    ], CompanyRegisterFilesDto.prototype, "files");
    return CompanyRegisterFilesDto;
}());
exports.CompanyRegisterFilesDto = CompanyRegisterFilesDto;
var SendCodeDto = /** @class */ (function () {
    function SendCodeDto() {
    }
    __decorate([
        (0, class_validator_1.MaxLength)(127),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], SendCodeDto.prototype, "email");
    return SendCodeDto;
}());
exports.SendCodeDto = SendCodeDto;
var ConfirmCodeDto = /** @class */ (function () {
    function ConfirmCodeDto() {
    }
    __decorate([
        (0, class_validator_1.MaxLength)(4),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], ConfirmCodeDto.prototype, "code");
    return ConfirmCodeDto;
}());
exports.ConfirmCodeDto = ConfirmCodeDto;
var ChangePasswordDto = /** @class */ (function () {
    function ChangePasswordDto() {
    }
    __decorate([
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], ChangePasswordDto.prototype, "password");
    return ChangePasswordDto;
}());
exports.ChangePasswordDto = ChangePasswordDto;
