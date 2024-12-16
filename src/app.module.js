"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var db_module_1 = require("./db/db.module");
var dto_1 = require("./lib/dto");
var lib_module_1 = require("./lib/lib.module");
var auth_module_1 = require("./routes/auth/auth.module");
var doctor_module_1 = require("./routes/doctor/doctor.module");
var socket_module_1 = require("./socket/socket.module");
var schedule_1 = require("@nestjs/schedule");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                schedule_1.ScheduleModule.forRoot(),
                db_module_1.DbModule,
                config_1.ConfigModule.forRoot(dto_1.ConfigModuleDto),
                lib_module_1.LibModule,
                auth_module_1.AuthModule,
                doctor_module_1.DoctorModule,
                socket_module_1.SocketModule
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
