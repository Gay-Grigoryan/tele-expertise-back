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
exports.DoctorService = void 0;
var templates_1 = require("../../lib/templates");
var common_1 = require("@nestjs/common");
var bcryptjs_1 = require("bcryptjs");
var DoctorService = /** @class */ (function () {
    function DoctorService(dbService) {
        this.dbService = dbService;
    }
    DoctorService.prototype.create = function (createDoctorDto) {
        return __awaiter(this, void 0, void 0, function () {
            var password, hospital_id, profession_id, data, hashedPassword, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        password = createDoctorDto.password, hospital_id = createDoctorDto.hospital_id, profession_id = createDoctorDto.profession_id, data = __rest(createDoctorDto, ["password", "hospital_id", "profession_id"]);
                        _a = bcryptjs_1.hash;
                        _b = [password];
                        return [4 /*yield*/, (0, bcryptjs_1.genSalt)(10)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                    case 2:
                        hashedPassword = _c.sent();
                        return [4 /*yield*/, this.dbService.doctor.create({
                                data: __assign(__assign({}, data), { password: hashedPassword, hospital: {
                                        connect: { id: hospital_id }
                                    }, profession: {
                                        connect: { id: profession_id }
                                    } })
                            })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, templates_1.REQUEST_HAS_ENDED_SUCCESSFULLY];
                }
            });
        });
    };
    DoctorService.prototype.findAll = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var page, rows_per_page, search, condition, _a, items, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        page = query.page, rows_per_page = query.rows_per_page, search = query.query;
                        condition = {
                            OR: [{ name: { contains: search } }, { phone: { contains: search } }, { email: { contains: search } }]
                        };
                        return [4 /*yield*/, Promise.all([
                                this.dbService.doctor.findMany({
                                    where: condition,
                                    select: {
                                        id: true,
                                        name: true,
                                        phone: true,
                                        email: true
                                    },
                                    skip: page * rows_per_page - rows_per_page,
                                    take: +rows_per_page
                                }),
                                this.dbService.doctor.count({ where: condition })
                            ])];
                    case 1:
                        _a = _b.sent(), items = _a[0], count = _a[1];
                        return [2 /*return*/, {
                                items: items,
                                pages: Math.ceil(count / rows_per_page)
                            }];
                }
            });
        });
    };
    DoctorService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var doctor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.doctor.findUniqueOrThrow({
                            where: { id: id },
                            select: {
                                id: true,
                                name: true,
                                phone: true,
                                email: true
                            }
                        })];
                    case 1:
                        doctor = _a.sent();
                        return [2 /*return*/, { item: doctor }];
                }
            });
        });
    };
    DoctorService.prototype.update = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.doctor.update({ where: { id: id }, data: body })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, templates_1.REQUEST_HAS_ENDED_SUCCESSFULLY];
                }
            });
        });
    };
 
    
    DoctorService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbService.doctor["delete"]({ where: { id: id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, templates_1.REQUEST_HAS_ENDED_SUCCESSFULLY];
                }
            });
        });
    };
    DoctorService = __decorate([
        (0, common_1.Injectable)()
    ], DoctorService);
    return DoctorService;
}());
exports.DoctorService = DoctorService;
