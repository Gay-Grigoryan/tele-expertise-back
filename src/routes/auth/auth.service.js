"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var error_codes_1 = require("../../../../../../../../src/lib/error-codes");
var bcryptjs_1 = require("bcryptjs");
var templates_1 = require("../../../../../../../../src/lib/templates");
var types_1 = require("../../../../../../../../src/lib/types");
var AuthService = /** @class */ (function () {
    function AuthService(dbService, libService, configService) {
        this.dbService = dbService;
        this.libService = libService;
        this.configService = configService;
    }
    AuthService.prototype.adminLogin = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dbService.superAdmin.findFirst({
                            where: { email: body.email }
                        })];
                    case 1:
                        user = _b.sent();
                        _a = !user;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, bcryptjs_1.compare)(body.password, user.password)];
                    case 2:
                        _a = !(_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a)
                            throw new common_1.HttpException(error_codes_1.NOT_AUTHENTICATED, common_1.HttpStatus.UNAUTHORIZED);
                        return [2 /*return*/, {
                                token: this.libService.signToken({ id: user.id, type: types_1.user_types.super_admin })
                            }];
                }
            });
        });
    };
    AuthService.prototype.login = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.dbService.doctor.findFirst({
                            where: { email: body.email }
                        })];
                    case 1:
                        user = _b.sent();
                        _a = !user;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, bcryptjs_1.compare)(body.password, user.password)];
                    case 2:
                        _a = !(_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a)
                            throw new common_1.HttpException(error_codes_1.NOT_AUTHENTICATED, common_1.HttpStatus.UNAUTHORIZED);
                        return [2 /*return*/, {
                                token: this.libService.signToken({ id: user.id, type: types_1.user_types.doctor })
                            }];
                }
            });
        });
    };
    AuthService.prototype.sendCodeForForgetPassword = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor, random, hashed_random, _a, _b, reset_token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.dbService.doctor.findFirstOrThrow({
                            where: { email: body.email }
                        })];
                    case 1:
                        doctor = _c.sent();
                        random = (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();
                        _a = bcryptjs_1.hash;
                        _b = [random];
                        return [4 /*yield*/, (0, bcryptjs_1.genSalt)(10)];
                    case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                    case 3:
                        hashed_random = _c.sent();
                        return [4 /*yield*/, this.libService.sendMail("Your Stone Market Confirmation Code", "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Password Reset</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f4f4f4;\n            margin: 0;\n            padding: 0;\n        }\n        .container {\n            max-width: 600px;\n            margin: 20px auto;\n            padding: 20px;\n            background-color: #fff;\n            border-radius: 5px;\n            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n        }\n        strong {\n          font-size: 30px;\n        }\n        h1 {\n            color: #333;\n        }\n        p {\n            color: #555;\n        }\n        .footer {\n            text-align: center;\n            color: #777;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <h1>Password Reset</h1>\n        <p>Hey ".concat(doctor.name, ",</p>\n        <p>You've requested a password reset for your Stone Market account. Here's your confirmation code: <strong>").concat(random, "</strong>.</p>\n        <p>Use this code to reset your password.</p>\n        <p>Best regards,<br>Stone Market Team</p>\n    </div>\n    <div class=\"footer\">\n        &copy; ").concat(new Date().getFullYear(), " Stone Market\n    </div>\n</body>\n</html>\n\n    "), doctor.email, true)];
                    case 4:
                        _c.sent();
                        reset_token = this.libService.signToken({ hash: hashed_random, user_id: doctor.id }, "10m");
                        return [2 /*return*/, { reset_token: reset_token }];
                }
            });
        });
    };
    AuthService.prototype.confirmCodeForForgetPassword = function (body, token_payload) {
        return __awaiter(this, void 0, void 0, function () {
            var change_password_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, bcryptjs_1.compare)(body.code, token_payload.hash)];
                    case 1:
                        if (!(_a.sent()))
                            throw new common_1.HttpException({ message: "code isn't matches", code: 4003 }, common_1.HttpStatus.UNAUTHORIZED);
                        change_password_token = this.libService.signToken({ user_id: token_payload.user_id, confirm: true }, "3m");
                        return [2 /*return*/, { change_password_token: change_password_token }];
                }
            });
        });
    };
    AuthService.prototype.changePasswordForForgetPassword = function (body, token_payload) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = bcryptjs_1.hash;
                        _b = [body.password];
                        return [4 /*yield*/, (0, bcryptjs_1.genSalt)(10)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                    case 2:
                        hashedPassword = _c.sent();
                        return [4 /*yield*/, this.dbService.doctor.update({ data: { password: hashedPassword }, where: { id: token_payload.user_id } })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, templates_1.REQUEST_HAS_ENDED_SUCCESSFULLY];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
