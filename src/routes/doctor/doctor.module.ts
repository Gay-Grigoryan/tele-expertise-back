import { Module } from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { DoctorController } from "./doctor.controller";
import { DoctorChatController } from "./doctor-chat.controller";
import { DoctorChatService } from "./doctor-chat.service";

@Module({
  controllers: [DoctorController, DoctorChatController],
  providers: [DoctorService, DoctorChatService]
})
export class DoctorModule {}
