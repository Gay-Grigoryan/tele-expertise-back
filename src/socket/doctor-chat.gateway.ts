import { DoctorMessageDto } from "./dto";
import { HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { UseFilters } from "@nestjs/common/decorators/core/exception-filters.decorator";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DbService } from "src/db/db.service";
import { LibService } from "src/lib/lib.service";
import { BadRequestTransformationFilter } from "src/middlewares/filters/socket-exception.filter";
import { TDoctorChatMessage } from "src/routes/doctor/types";

@UseFilters(BadRequestTransformationFilter)
@WebSocketGateway({
  cors: {
    origin: "*"
  },
  namespace: "/doctor-chat"
})
export class DoctorChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private libServices: LibService, private dbService: DbService) {}

  async onDoctorSentMessage(message: TDoctorChatMessage) {
    this.server.to(`doctor-${message.receiver_id}`).emit("message", message);
  }

  @SubscribeMessage("message")
  @UsePipes(new ValidationPipe())
  async doctorSendMessage(@ConnectedSocket() client: Socket, @MessageBody() data: DoctorMessageDto) {
    try {
      const message = await this.dbService.message.create({
        data: {
          type: "text",
          message: data.message,
          sender: {
            connect: { id: client.data.user.id }
          },
          receiver: {
            connect: { id: data.receiver_id }
          }
        }
      });

      this.server.to(`doctor-${data.receiver_id}`).emit("message", message);
    } catch (err) {
      throw new WsException({ status: HttpStatus.NOT_ACCEPTABLE, messages: "Wrong params", code: 4060 });
    }
  }

  async handleDisconnect(client: Socket) {
    // ----
  }
  async handleConnection(client: Socket) {
    const authToken: string = Array.isArray(client.handshake?.query?.token) ? "" : client.handshake?.query?.token;

    try {
      const tokenPayload = await this.libServices.verifyToken<{ id: string }>(authToken);
      const doctor = await this.dbService.doctor.findFirstOrThrow({ where: { id: tokenPayload.id } });

      client.join(`doctor-${doctor.id}`);
      client.data.user = doctor;
    } catch (err) {
      client.disconnect();
    }
  }
}
