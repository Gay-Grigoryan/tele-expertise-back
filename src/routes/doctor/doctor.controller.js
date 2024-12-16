"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DoctorController = void 0;
var user_decorator_1 = require("../auth/decorators/user.decorator");
var common_1 = require("@nestjs/common");
var auth_decorator_1 = require("../auth/decorators/auth.decorator");
var role_decorator_1 = require("../auth/decorators/role.decorator");
var types_1 = require("../../../../../../../../src/lib/types");
var DoctorController = /** @class */ (function () {
    function DoctorController(doctorService, dbService) {
        this.doctorService = doctorService;
        this.dbService = dbService;
    }
    DoctorController.prototype.getDoctorInfo = function (user) {
        return { info: user };
    };
    DoctorController.prototype.create = function (body) {
        return this.doctorService.create(body);
    };
    DoctorController.prototype.findAll = function (query) {
        return this.doctorService.findAll(query);
    };
    DoctorController.prototype.findOne = function (id) {
        return this.doctorService.findOne(id);
    };
    DoctorController.prototype.update = function (id, body) {
        return this.doctorService.update(id, body);
    };
    DoctorController.prototype.remove = function (id) {
        return this.doctorService.remove(id);
    };
    __decorate([
        (0, role_decorator_1.Roles)(types_1.user_types.doctor),
        (0, common_1.Get)("my-info"),
        __param(0, (0, user_decorator_1.GetUser)())
    ], DoctorController.prototype, "getDoctorInfo");
    __decorate([
        (0, role_decorator_1.Roles)(types_1.user_types.super_admin),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], DoctorController.prototype, "create");
    __decorate([
        (0, role_decorator_1.Roles)(types_1.user_types.super_admin),
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)())
    ], DoctorController.prototype, "findAll");
    __decorate([
        (0, role_decorator_1.Roles)(types_1.user_types.super_admin),
        (0, common_1.Get)(":id"),
        __param(0, (0, common_1.Param)("id"))
    ], DoctorController.prototype, "findOne");
    __decorate([
        (0, role_decorator_1.Roles)(types_1.user_types.super_admin),
        (0, common_1.Put)(":id"),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Body)())
    ], DoctorController.prototype, "update");
    __decorate([
        (0, role_decorator_1.Roles)(types_1.user_types.super_admin),
        (0, common_1.Delete)(":id"),
        __param(0, (0, common_1.Param)("id"))
    ], DoctorController.prototype, "remove");
    DoctorController = __decorate([
        (0, auth_decorator_1.Auth)(),
        (0, common_1.Controller)("doctors")
    ], DoctorController);
    return DoctorController;
}());
exports.DoctorController = DoctorController;
