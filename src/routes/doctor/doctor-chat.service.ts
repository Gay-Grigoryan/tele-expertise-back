import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DbService } from "src/db/db.service";
import { PaginationQueryDto } from "src/lib/dto";
import { REQUEST_HAS_ENDED_SUCCESSFULLY } from "src/lib/templates";
import { DoctorChatGateway } from "src/socket/doctor-chat.gateway";

@Injectable()
export class DoctorChatService {
  constructor(private readonly dbService: DbService, private readonly doctorSocket: DoctorChatGateway) { }


  async getConversations(sender_id: string) {
    // Fetch all messages involving the sender
    const messages = await this.dbService.message.findMany({
      where: {
        OR: [{ sender_id }, { receiver_id: sender_id }]
      },
      select: {
        id: true,
        message: true,
        date: true,
        is_seen: true,
        sender_id: true,
        receiver_id: true,
        sender: { select: { user: { select: { name: true } } } },
        receiver: { select: { user: { select: { name: true } } } }
      },
      orderBy: { id: "desc" } // Ensure the latest messages come first
    });

    // Normalize sender/receiver pairs and filter distinct conversations
    const seenPairs = new Set<string>();
    const uniqueConversations = messages.filter(msg => {
      // Normalize the pair (e.g., "A-B" and "B-A" are treated the same)
      const pairKey =
        msg.sender_id < msg.receiver_id ? `${msg.sender_id}-${msg.receiver_id}` : `${msg.receiver_id}-${msg.sender_id}`;

      if (seenPairs.has(pairKey)) {
        return false;
      }

      seenPairs.add(pairKey);
      return true;
    });

    // Map the data to the desired format
    const items = uniqueConversations.map(msg => {
      const isSender = msg.sender_id === sender_id;

      return {
        id: msg.id,
        message: msg.message,
        date: msg.date,
        is_seen: msg.is_seen,
        doctor: isSender
          ? { id: msg.receiver_id, name: msg.receiver.user.name } // If I am the sender, the doctor is the receiver
          : { id: msg.sender_id, name: msg.sender.user.name } // If I am the receiver, the doctor is the sender
      };
    });

    return { items };
  }


  async getMessages(sender_id: string, _receiver_id: string, pagination_query: PaginationQueryDto) {
    const { page, rows_per_page } = pagination_query;

    const condition: Prisma.MessageWhereInput = {
      OR: [
        { sender_id, receiver_id: _receiver_id },
        { sender_id: _receiver_id, receiver_id: sender_id }
      ]
    };

    const [messages, total_count] = await Promise.all([
      this.dbService.message
        .findMany({
          select: {
            id: true,
            message: true,
            date: true,
            type: true,
            sender_id: true,
            receiver_id: true,
            files: { select: { file: true } }
          },
          orderBy: { id: "desc" },
          where: condition,
          skip: page * rows_per_page - rows_per_page,
          take: +rows_per_page
        })
        .then(data =>
          data
            .map(({ files, receiver_id, ...el }) => ({
              ...el,
              is_mine: receiver_id == _receiver_id,
              message: el.type == "file" ? files.map(({ file }) => file) : el.message
            }))
            .reverse()
        ),
      this.dbService.message.count({
        where: condition
      })
    ]);

    return { items: messages, pages: Math.ceil(total_count / rows_per_page) };
  }

  async sendFile(sender_id: string, receiver_id: string, files: string[]) {
    const message = await this.dbService.message
      .create({
        include: { files: true },
        data: {
          receiver: { connect: { id: receiver_id } },
          sender: { connect: { id: sender_id } },
          type: "file",
          files: { createMany: { data: files.map(el => ({ file: el })) } }
        }
      })
      .then(({ files, ...el }) => ({ ...el, message: files.map(({ file }) => file) }));

    this.doctorSocket.onDoctorSentMessage(message);

    return REQUEST_HAS_ENDED_SUCCESSFULLY;
  }

  async getFiles(sender_id: string, receiver_id: string) {
    const files = await this.dbService.messageFile.findMany({
      where: {
        message: {
          sender_id,
          receiver_id
        }
      }
    });

    return { items: files };
  }
}
