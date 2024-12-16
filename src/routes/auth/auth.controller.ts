import { ChangePasswordDto, ConfirmCodeDto, LoginDto, SendCodeDto } from "./dto";
import { Body, Headers, Controller, HttpCode, HttpException, HttpStatus, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { INTERNAL_SERVER_ERROR } from "src/lib/error-codes";
import { LibService } from "src/lib/lib.service";
import { IChangePasswordToken, IResetToken } from "./types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly libService: LibService) {}

  @Post("admin/login")
  adminLogin(@Body() body: LoginDto) {
    return this.authService.adminLogin(body);
  }

  @Post("login")
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @HttpCode(200)
  @Post("/forget-password/send-code")
  sendCodeForForgetPassword(@Body() body: SendCodeDto) {
    return this.authService.sendCodeForForgetPassword(body);
  }

  @HttpCode(200)
  @Post("/forget-password/confirm-code")
  confirmCodeForForgetPassword(@Body() body: ConfirmCodeDto, @Headers("reset_token") reset_token: string) {
    try {
      const token = this.libService.verifyToken<IResetToken>(reset_token);

      return this.authService.confirmCodeForForgetPassword(body, token);
    } catch (err) {
      if (err?.key == "jwt_error") {
        throw new HttpException({ message: "wrong reset_token", code: 4060 }, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/forget-password/change-password")
  changePasswordForForgetPassword(
    @Body() body: ChangePasswordDto,
    @Headers("change_password_token") change_password_token: string
  ) {
    try {
      const token = this.libService.verifyToken<IChangePasswordToken>(change_password_token);
      if (!token.confirm) throw { key: "jwt_error" };

      return this.authService.changePasswordForForgetPassword(body, token);
    } catch (err) {
      if (err?.key == "jwt_error") {
        throw new HttpException({ message: "wrong change_password_token", code: 4060 }, HttpStatus.NOT_ACCEPTABLE);
      }
      throw new HttpException(INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
