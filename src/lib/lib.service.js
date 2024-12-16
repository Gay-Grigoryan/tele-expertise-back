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
exports.LibService = void 0;
var common_1 = require("@nestjs/common");
var nodemailer_1 = require("nodemailer");
var error_codes_1 = require("./error-codes");
var LibService = /** @class */ (function () {
    function LibService(jwt, configService) {
        this.jwt = jwt;
        this.configService = configService;
        this.secret = this.configService.get("JWT_SECRET");
    }
    LibService.prototype.signToken = function (payload, expire_time) {
        if (expire_time === void 0) { expire_time = 365 * 24 * 60 * 60; }
        return this.jwt.sign(payload, {
            secret: this.secret,
            expiresIn: expire_time
        });
    };
    LibService.prototype.verifyToken = function (token, secret) {
        return this.jwt.verify(token, {
            secret: secret || this.secret
        });
    };
    LibService.prototype.sendMail = function (subject, content, reciever, isContentHtml) {
        if (isContentHtml === void 0) { isContentHtml = false; }
        return __awaiter(this, void 0, void 0, function () {
            var email, transporter, mailOptions, err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = this.configService.get("EMAIL_USER");
                        transporter = (0, nodemailer_1.createTransport)({
                            service: "gmail",
                            auth: {
                                user: email,
                                pass: this.configService.get("EMAIL_PASS")
                            }
                        });
                        mailOptions = (_a = {
                                from: email,
                                to: reciever,
                                subject: subject
                            },
                            _a[isContentHtml ? "html" : "text"] = content,
                            _a);
                        console.log("Sending email to: ", reciever, mailOptions);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, transporter.sendMail(mailOptions)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log(new common_1.HttpException((0, error_codes_1.CANT_SEND_EMAIL)(Array.isArray(reciever) ? reciever.join(",") : reciever), common_1.HttpStatus.INTERNAL_SERVER_ERROR));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LibService = __decorate([
        (0, common_1.Injectable)()
    ], LibService);
    return LibService;
}());
exports.LibService = LibService;
