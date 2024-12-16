"use strict";
exports.__esModule = true;
exports.Auth = void 0;
var roles_guard_1 = require("./../guards/roles.guard");
var jwt_guard_1 = require("./../guards/jwt.guard");
var common_1 = require("@nestjs/common");
function Auth() {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)("roles", roles), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard));
}
exports.Auth = Auth;
