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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var error_codes_1 = require("../../../../../../../../src/lib/error-codes");
var AuthController = /** @class */ (function () {
    function AuthController(authService, libService) {
        this.authService = authService;
        this.libService = libService;
    }
    AuthController.prototype.adminLogin = function (body) {
        return this.authService.adminLogin(body);
    };
    AuthController.prototype.login = function (body) {
        return this.authService.login(body);
    };
    AuthController.prototype.sendCodeForForgetPassword = function (body) {
        return this.authService.sendCodeForForgetPassword(body);
    };
    AuthController.prototype.confirmCodeForForgetPassword = function (body, reset_token) {
        try {
            var token = this.libService.verifyToken(reset_token);
            return this.authService.confirmCodeForForgetPassword(body, token);
        }
        catch (err) {
            if ((err === null || err === void 0 ? void 0 : err.key) == "jwt_error") {
                throw new common_1.HttpException({ message: "wrong reset_token", code: 4060 }, common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            throw new common_1.HttpException(error_codes_1.INTERNAL_SERVER_ERROR, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    AuthController.prototype.changePasswordForForgetPassword = function (body, change_password_token) {
        try {
            var token = this.libService.verifyToken(change_password_token);
            if (!token.confirm)
                throw { key: "jwt_error" };
            return this.authService.changePasswordForForgetPassword(body, token);
        }
        catch (err) {
            if ((err === null || err === void 0 ? void 0 : err.key) == "jwt_error") {
                throw new common_1.HttpException({ message: "wrong change_password_token", code: 4060 }, common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            throw new common_1.HttpException(error_codes_1.INTERNAL_SERVER_ERROR, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    __decorate([
        (0, common_1.Post)("admin/login"),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "adminLogin");
    __decorate([
        (0, common_1.Post)("login"),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "login");
    __decorate([
        (0, common_1.HttpCode)(200),
        (0, common_1.Post)("/forget-password/send-code"),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "sendCodeForForgetPassword");
    __decorate([
        (0, common_1.HttpCode)(200),
        (0, common_1.Post)("/forget-password/confirm-code"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Headers)("reset_token"))
    ], AuthController.prototype, "confirmCodeForForgetPassword");
    __decorate([
        (0, common_1.Put)("/forget-password/change-password"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Headers)("change_password_token"))
    ], AuthController.prototype, "changePasswordForForgetPassword");
    AuthController = __decorate([
        (0, common_1.Controller)("auth")
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
