import { IsIn, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class SeeNotificationDto {
  @IsNumber({}, { each: true })
  ids: number[];
}

export class UpdateTicketAmount {
  @IsNotEmpty()
  @IsInt()
  amount: number;
}

export class ChangeUserPasswordDto {
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  old_password: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ChangeUserPhoneDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

export class GetMobileVersionQueryDto {
  @IsIn(["android", "ios"])
  @IsNotEmpty()
  type: "android" | "ios";
}

export class GetTranslationsDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
