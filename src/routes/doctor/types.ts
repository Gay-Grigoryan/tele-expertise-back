import { Message } from "@prisma/client";

export type TDoctorChatMessage = Omit<Message, "message"> & {
  message: string | string[];
};
