import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseInterceptors } from "@nestjs/common";
import { Auth } from "../auth/decorators/auth.decorator";
import { GetUser } from "../auth/decorators/user.decorator";
import { Doctor } from "@prisma/client";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Files } from "src/decorators/files.decorator";
import multerOptions, { NO_FILTER } from "src/middlewares/interceptors/multer";
import { possibleFiles } from "src/middlewares/interceptors/multer/filesTypes";
import { ReceiverIdDto, SendFileDto } from "./dto";
import { TUser, user_types } from "src/lib/types";
import { DoctorChatService } from "./doctor-chat.service";
import { PaginationQueryDto } from "src/lib/dto";

@Auth(user_types.doctor, user_types.super_admin)
@Controller("doctors")
export class DoctorChatController {
  constructor(private readonly doctorChatService: DoctorChatService) {}

  @Get("/chat/conversations")
  getConversations(@GetUser() doctor: Doctor) {
    return this.doctorChatService.getConversations(doctor.id);
  }

  @Get(":receiver_id/chat/messages")
  getMessagesForCompany(@Param() params: ReceiverIdDto, @GetUser() doctor: Doctor, @Query() query: PaginationQueryDto) {
    return this.doctorChatService.getMessages(doctor.id, params.receiver_id, query);
  }

  @UseInterceptors(FileFieldsInterceptor(possibleFiles.send_file_in_doctor_chat, multerOptions(NO_FILTER)))
  @Post(":receiver_id/chat/send-file")
  sendFileForCustomer(@Param() params: ReceiverIdDto, @GetUser() doctor: Doctor, @Files({ optimize: true }) files: SendFileDto) {
    return this.doctorChatService.sendFile(doctor.id, params.receiver_id, files.files);
  }

  @Get("/files")
  getChatFilesForUser(@GetUser() user: TUser<Doctor>, @Query("receiver_id") receiver_id: string) {
    return this.doctorChatService.getFiles(user.doctor.id, receiver_id);
  }
}
