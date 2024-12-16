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
exports.SendFileDto = exports.ReceiverIdDto = exports.UpdateDoctorDto = exports.CreateDoctorDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreateDoctorDto = /** @class */ (function () {
    function CreateDoctorDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(127)
    ], CreateDoctorDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsPhoneNumber)()
    ], CreateDoctorDto.prototype, "phone");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsEmail)()
    ], CreateDoctorDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(8)
    ], CreateDoctorDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)()
    ], CreateDoctorDto.prototype, "hospital_id");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsInt)()
    ], CreateDoctorDto.prototype, "profession_id");
    return CreateDoctorDto;
}());
exports.CreateDoctorDto = CreateDoctorDto;
var UpdateDoctorDto = /** @class */ (function (_super) {
    __extends(UpdateDoctorDto, _super);
    function UpdateDoctorDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateDoctorDto;
}((0, mapped_types_1.PartialType)(CreateDoctorDto)));
exports.UpdateDoctorDto = UpdateDoctorDto;
var ReceiverIdDto = /** @class */ (function () {
    function ReceiverIdDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], ReceiverIdDto.prototype, "receiver_id");
    return ReceiverIdDto;
}());
exports.ReceiverIdDto = ReceiverIdDto;
var SendFileDto = /** @class */ (function () {
    function SendFileDto() {
    }
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return (Array.isArray(value) ? value : [value]);
        }),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsNotEmpty)()
    ], SendFileDto.prototype, "files");
    return SendFileDto;
}());
exports.SendFileDto = SendFileDto;
