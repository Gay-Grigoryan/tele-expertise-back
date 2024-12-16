import { PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(127)
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsInt()
  hospital_id: number;

  @IsNotEmpty()
  @IsInt()
  profession_id: number;
}

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}

export class ReceiverIdDto {
  @IsNotEmpty()
  @IsString()
  receiver_id: string;
}

export class SendFileDto {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsNotEmpty()
  files: string[];
}
