"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.DoctorChatService = void 0;
var common_1 = require("@nestjs/common");
var templates_1 = require("../../../../../../../../src/lib/templates");
var DoctorChatService = /** @class */ (function () {
    function DoctorChatService(dbService, doctorSocket) {
        this.dbService = dbService;
        this.doctorSocket = doctorSocket;
    }
    DoctorChatService.prototype.getConversations = function (sender_id) {
        return __awaiter(this, void 0, void 0, function () {
            var condition, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condition = {
                            OR: [{ sender_id: sender_id }, { receiver_id: sender_id }]
                        };
                        return [4 /*yield*/, this.dbService.message
                                .findMany({
                                select: {
                                    id: true,
                                    message: true,
                                    date: true,
                                    is_seen: true,
                                    receiver: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                },
                                where: condition,
                                orderBy: { id: "desc" },
                                distinct: ["sender_id"]
                            })
                                .then(function (data) {
                                return data.map(function (_a) {
                                    var receiver = _a.receiver, el = __rest(_a, ["receiver"]);
                                    return (__assign(__assign({}, el), { doctor: receiver }));
                                });
                            })];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, { items: items }];
                }
            });
        });
    };
    DoctorChatService.prototype.getMessages = function (sender_id, receiver_id, pagination_query) {
        return __awaiter(this, void 0, void 0, function () {
            var page, rows_per_page, condition, _a, messages, total_count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        page = pagination_query.page, rows_per_page = pagination_query.rows_per_page;
                        condition = {
                            OR: [
                                { sender_id: sender_id, receiver_id: receiver_id },
                                { sender_id: receiver_id, receiver_id: sender_id }
                            ]
                        };
                        return [4 /*yield*/, Promise.all([
                                this.dbService.message
                                    .findMany({
                                    select: {
                                        id: true,
                                        message: true,
                                        date: true,
                                        type: true,
                                        sender_id: true,
                                        files: { select: { file: true } }
                                    },
                                    orderBy: { id: "desc" },
                                    where: condition,
                                    skip: page * rows_per_page - rows_per_page,
                                    take: +rows_per_page
                                })
                                    .then(function (data) {
                                    return data
                                        .map(function (_a) {
                                        var files = _a.files, sender_id = _a.sender_id, el = __rest(_a, ["files", "sender_id"]);
                                        return (__assign(__assign({}, el), { is_mine: sender_id == sender_id, message: el.type == "file" ? files.map(function (_a) {
                                                var file = _a.file;
                                                return file;
                                            }) : el.message }));
                                    })
                                        .reverse();
                                }),
                                this.dbService.message.count({
                                    where: condition
                                })
                            ])];
                    case 1:
                        _a = _b.sent(), messages = _a[0], total_count = _a[1];
                        return [2 /*return*/, { items: messages, pages: Math.ceil(total_count / rows_per_page) }];
                }
            });
        });
    };
    DoctorChatService.prototype.sendFile = function (sender_id, receiver_id, files) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.message
                            .create({
                            include: { files: true },
                            data: {
                                receiver: { connect: { id: receiver_id } },
                                sender: { connect: { id: sender_id } },
                                type: "file",
                                files: { createMany: { data: files.map(function (el) { return ({ file: el }); }) } }
                            }
                        })
                            .then(function (_a) {
                            var files = _a.files, el = __rest(_a, ["files"]);
                            return (__assign(__assign({}, el), { message: files.map(function (_a) {
                                    var file = _a.file;
                                    return file;
                                }) }));
                        })];
                    case 1:
                        message = _a.sent();
                        this.doctorSocket.onDoctorSentMessage(message);
                        return [2 /*return*/, templates_1.REQUEST_HAS_ENDED_SUCCESSFULLY];
                }
            });
        });
    };
    DoctorChatService.prototype.getFiles = function (sender_id, receiver_id) {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.messageFile.findMany({
                            where: {
                                message: {
                                    sender_id: sender_id,
                                    receiver_id: receiver_id
                                }
                            }
                        })];
                    case 1:
                        files = _a.sent();
                        return [2 /*return*/, { items: files }];
                }
            });
        });
    };
    DoctorChatService = __decorate([
        (0, common_1.Injectable)()
    ], DoctorChatService);
    return DoctorChatService;
}());
exports.DoctorChatService = DoctorChatService;
