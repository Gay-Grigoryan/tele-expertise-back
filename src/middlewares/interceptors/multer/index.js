"use strict";
exports.__esModule = true;
exports.NO_FILTER = void 0;
var common_1 = require("@nestjs/common");
var multer_1 = require("multer");
var error_codes_1 = require("../../../../../../../../../src/lib/error-codes");
var filesTypes_1 = require("./filesTypes");
exports.NO_FILTER = "no-filter";
var multerOptions = function (files_type_key) { return ({
    storage: (0, multer_1.diskStorage)({
        destination: function (req, file, cb) {
            cb(null, "public/protected_files");
        },
        filename: function (req, file, cb) {
            var fileName = Date.now() + "--" + file.originalname.replace(/ +/g, "_");
            cb(null, fileName);
        }
    }),
    fileFilter: function (req, file, cb) {
        var _a, _b;
        var _c = file.mimetype.split("/"), fileType = _c[0], fileFormat = _c[1];
        if (!files_type_key) {
            if (fileType != "image")
                cb(new common_1.HttpException(error_codes_1.WRONG_PARAMS, common_1.HttpStatus.NOT_ACCEPTABLE));
        }
        else if (files_type_key != exports.NO_FILTER) {
            var currentType = filesTypes_1["default"][files_type_key];
            if (currentType) {
                var validMimeTypes = ((_a = currentType[file.fieldname]) === null || _a === void 0 ? void 0 : _a.mime_type) ? currentType[file.fieldname].mime_type.split("/") : [];
                var checkMimeType = validMimeTypes.length && !validMimeTypes.includes(fileType);
                var validFormats = ((_b = currentType[file.fieldname]) === null || _b === void 0 ? void 0 : _b.format) ? currentType[file.fieldname].format.split("/") : [];
                var checkFormat = validFormats.length && !validFormats.includes(fileFormat);
                if (checkFormat && checkMimeType)
                    cb(new common_1.HttpException((0, error_codes_1.VALIDATION_ERROR)("'".concat(file.fieldname, "' must be in incorrect format")), common_1.HttpStatus.NOT_ACCEPTABLE));
            }
        }
        cb(null, true);
    }
}); };
exports["default"] = multerOptions;
