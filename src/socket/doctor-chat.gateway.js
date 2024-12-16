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
exports.DoctorChatGateway = void 0;
var common_1 = require("@nestjs/common");
var exception_filters_decorator_1 = require("@nestjs/common/decorators/core/exception-filters.decorator");
var websockets_1 = require("@nestjs/websockets");
var socket_exception_filter_1 = require("../../../../../../../src/middlewares/filters/socket-exception.filter");
var DoctorChatGateway = /** @class */ (function () {
    function DoctorChatGateway(libServices, dbService) {
        this.libServices = libServices;
        this.dbService = dbService;
    }
    DoctorChatGateway.prototype.onDoctorSentMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.server.to("doctor-".concat(message.receiver_id)).emit("message", message);
                return [2 /*return*/];
            });
        });
    };
    DoctorChatGateway.prototype.doctorSendMessage = function (client, data) {
        return __awaiter(this, void 0, void 0, function () {
            var message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dbService.message.create({
                                data: {
                                    type: "text",
                                    message: data.message,
                                    sender: {
                                        connect: { id: client.data.user.id }
                                    },
                                    receiver: {
                                        connect: { id: data.receiver_id }
                                    }
                                }
                            })];
                    case 1:
                        message = _a.sent();
                        this.server.to("doctor-".concat(data.receiver_id)).emit("message", message);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        throw new websockets_1.WsException({ status: common_1.HttpStatus.NOT_ACCEPTABLE, messages: "Wrong params", code: 4060 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DoctorChatGateway.prototype.handleDisconnect = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DoctorChatGateway.prototype.handleConnection = function (client) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var authToken, tokenPayload, doctor, err_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        authToken = Array.isArray((_b = (_a = client.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.token) ? "" : (_d = (_c = client.handshake) === null || _c === void 0 ? void 0 : _c.query) === null || _d === void 0 ? void 0 : _d.token;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.libServices.verifyToken(authToken)];
                    case 2:
                        tokenPayload = _e.sent();
                        return [4 /*yield*/, this.dbService.doctor.findFirstOrThrow({ where: { id: tokenPayload.id } })];
                    case 3:
                        doctor = _e.sent();
                        client.join("doctor-".concat(doctor.id));
                        client.data.user = doctor;
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _e.sent();
                        client.disconnect();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, websockets_1.WebSocketServer)()
    ], DoctorChatGateway.prototype, "server");
    __decorate([
        (0, websockets_1.SubscribeMessage)("message"),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, websockets_1.ConnectedSocket)()),
        __param(1, (0, websockets_1.MessageBody)())
    ], DoctorChatGateway.prototype, "doctorSendMessage");
    DoctorChatGateway = __decorate([
        (0, exception_filters_decorator_1.UseFilters)(socket_exception_filter_1.BadRequestTransformationFilter),
        (0, websockets_1.WebSocketGateway)({
            cors: {
                origin: "*"
            },
            namespace: "/doctor-chat"
        })
    ], DoctorChatGateway);
    return DoctorChatGateway;
}());
exports.DoctorChatGateway = DoctorChatGateway;
