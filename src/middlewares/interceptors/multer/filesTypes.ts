import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
// import { Field } from "multer";

export const possibleFiles = {
  send_file_in_doctor_chat: [{ name: "files" }]
} satisfies Record<string, MulterField[]>;
const types: Record<string, Record<string, { mime_type?: string; format?: string }>> = {};

export default types;
