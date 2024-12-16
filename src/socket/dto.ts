import { IsNotEmpty, IsString } from "class-validator";

export class DoctorMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  receiver_id: string;
}
