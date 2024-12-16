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
exports.TransformJsonParse = exports.IfNotExist = exports.SearchQueryDro = exports.PaginationWithSearchQueryDto = exports.PaginationQueryDto = exports.ConfigModuleDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var Joi = require("@hapi/joi");
var common_1 = require("@nestjs/common");
exports.ConfigModuleDto = {
    isGlobal: true,
    envFilePath: ".env",
    validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        DEFAULT_TICKETS_COUNT: Joi.number().required(),
        IDRAM_ID: Joi.string().required(),
        IDRAM_SECRET_KEY: Joi.string().required()
    })
};
var PaginationQueryDto = /** @class */ (function () {
    function PaginationQueryDto() {
        this.page = 1;
        this.rows_per_page = 10;
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)()
    ], PaginationQueryDto.prototype, "page");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Type)(function () { return Number; }),
        (0, class_validator_1.IsNumber)()
    ], PaginationQueryDto.prototype, "rows_per_page");
    return PaginationQueryDto;
}());
exports.PaginationQueryDto = PaginationQueryDto;
var PaginationWithSearchQueryDto = /** @class */ (function (_super) {
    __extends(PaginationWithSearchQueryDto, _super);
    function PaginationWithSearchQueryDto() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.query = "";
        return _this;
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], PaginationWithSearchQueryDto.prototype, "query");
    return PaginationWithSearchQueryDto;
}(PaginationQueryDto));
exports.PaginationWithSearchQueryDto = PaginationWithSearchQueryDto;
var SearchQueryDro = /** @class */ (function () {
    function SearchQueryDro() {
        this.query = "";
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], SearchQueryDro.prototype, "query");
    return SearchQueryDro;
}());
exports.SearchQueryDro = SearchQueryDro;
function IfNotExist(key) {
    return (0, common_1.applyDecorators)((0, class_validator_1.ValidateIf)(function (o) { return [undefined, null].includes(o[key]); }), (0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value, obj = _a.obj;
        return ([undefined, null].includes(obj[key]) ? value : undefined);
    }));
}
exports.IfNotExist = IfNotExist;
function TransformJsonParse() {
    return (0, common_1.applyDecorators)((0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value;
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return 0;
        }
    }, { toClassOnly: true }), (0, class_validator_1.IsObject)({ message: function (arg) { return "".concat(arg.property, " must be json string"); } }));
}
exports.TransformJsonParse = TransformJsonParse;
