import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsPhoneNumber, IsArray } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class CustomerRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(127)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class CustomerRegisterFilesDto {
  @IsNotEmpty()
  avatar: string;
}
export class CompanyRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(127)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  tin: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class CompanyRegisterFilesDto {
  @IsNotEmpty()
  avatar: string;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  files: string[];
}

export class SendCodeDto {
  @MaxLength(127)
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ConfirmCodeDto {
  @MaxLength(4)
  @IsString()
  @IsNotEmpty()
  code: string;
}
export class ChangePasswordDto {
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
