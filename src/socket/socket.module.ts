import { Global, Module } from "@nestjs/common";
import { DoctorChatGateway } from "./doctor-chat.gateway";
@Global()
@Module({
  providers: [DoctorChatGateway],
  exports: [DoctorChatGateway]
})
export class SocketModule {}
