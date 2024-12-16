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
exports.DoctorChatController = void 0;
var common_1 = require("@nestjs/common");
var auth_decorator_1 = require("../auth/decorators/auth.decorator");
var user_decorator_1 = require("../auth/decorators/user.decorator");
var platform_express_1 = require("@nestjs/platform-express");
var files_decorator_1 = require("../../../../../../../../src/decorators/files.decorator");
var multer_1 = require("../../../../../../../../src/middlewares/interceptors/multer");
var filesTypes_1 = require("../../../../../../../../src/middlewares/interceptors/multer/filesTypes");
var types_1 = require("../../../../../../../../src/lib/types");
var DoctorChatController = /** @class */ (function () {
    function DoctorChatController(doctorChatService) {
        this.doctorChatService = doctorChatService;
    }
    DoctorChatController.prototype.getConversations = function (doctor) {
        return this.doctorChatService.getConversations(doctor.id);
    };
    DoctorChatController.prototype.getMessagesForCompany = function (params, doctor, query) {
        return this.doctorChatService.getMessages(doctor.id, params.receiver_id, query);
    };
    DoctorChatController.prototype.sendFileForCustomer = function (params, doctor, files) {
        return this.doctorChatService.sendFile(doctor.id, params.receiver_id, files.files);
    };
    DoctorChatController.prototype.getChatFilesForUser = function (user, receiver_id) {
        return this.doctorChatService.getFiles(user.doctor.id, receiver_id);
    };
    __decorate([
        (0, common_1.Get)("/chat/conversations"),
        __param(0, (0, user_decorator_1.GetUser)())
    ], DoctorChatController.prototype, "getConversations");
    __decorate([
        (0, common_1.Get)(":receiver_id/chat/messages"),
        __param(0, (0, common_1.Param)()),
        __param(1, (0, user_decorator_1.GetUser)()),
        __param(2, (0, common_1.Query)())
    ], DoctorChatController.prototype, "getMessagesForCompany");
    __decorate([
        (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(filesTypes_1.possibleFiles.send_file_in_doctor_chat, (0, multer_1["default"])(multer_1.NO_FILTER))),
        (0, common_1.Post)(":receiver_id/chat/send-file"),
        __param(0, (0, common_1.Param)()),
        __param(1, (0, user_decorator_1.GetUser)()),
        __param(2, (0, files_decorator_1.Files)({ optimize: true }))
    ], DoctorChatController.prototype, "sendFileForCustomer");
    __decorate([
        (0, common_1.Get)("/files"),
        __param(0, (0, user_decorator_1.GetUser)()),
        __param(1, (0, common_1.Query)("receiver_id"))
    ], DoctorChatController.prototype, "getChatFilesForUser");
    DoctorChatController = __decorate([
        (0, auth_decorator_1.Auth)(types_1.user_types.doctor, types_1.user_types.super_admin),
        (0, common_1.Controller)("doctors")
    ], DoctorChatController);
    return DoctorChatController;
}());
exports.DoctorChatController = DoctorChatController;
