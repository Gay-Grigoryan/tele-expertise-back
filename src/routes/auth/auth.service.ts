import { ConfigService } from "@nestjs/config";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { NOT_AUTHENTICATED } from "src/lib/error-codes";
import { LibService } from "src/lib/lib.service";
import { ChangePasswordDto, ConfirmCodeDto, LoginDto, SendCodeDto } from "./dto";
import { compare, genSalt, hash } from "bcryptjs";
import { IChangePasswordToken, IResetToken } from "./types";
import { REQUEST_HAS_ENDED_SUCCESSFULLY } from "src/lib/templates";
import { user_types } from "src/lib/types";

@Injectable()
export class AuthService {
  constructor(private dbService: DbService, private libService: LibService, private configService: ConfigService) {}

  async adminLogin(body: LoginDto) {
    const user = await this.dbService.user.findFirst({
      where: { email: body.email }
    });

    if (!user || !(await compare(body.password, user.password)))
      throw new HttpException(NOT_AUTHENTICATED, HttpStatus.UNAUTHORIZED);

    return {
      token: this.libService.signToken({ id: user.id, type: user.type }),
      type: user.type
    };
  }

  async login(body: LoginDto) {
    const user = await this.dbService.user.findFirst({
      where: { email: body.email }
    });

    if (!user || !(await compare(body.password, user.password)))
      throw new HttpException(NOT_AUTHENTICATED, HttpStatus.UNAUTHORIZED);

    return {
      token: this.libService.signToken({ id: user.id, type: user_types.doctor })
    };
  }

  async sendCodeForForgetPassword(body: SendCodeDto) {
    const doctor = await this.dbService.user.findFirstOrThrow({
      where: { email: body.email }
    });

    const random = (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString();
    const hashed_random = await hash(random, await genSalt(10));

    await this.libService.sendMail(
      "Your Stone Market Confirmation Code",
      `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        strong {
          font-size: 30px;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
        }
        .footer {
            text-align: center;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset</h1>
        <p>Hey ${doctor.name},</p>
        <p>You've requested a password reset for your Stone Market account. Here's your confirmation code: <strong>${random}</strong>.</p>
        <p>Use this code to reset your password.</p>
        <p>Best regards,<br>Stone Market Team</p>
    </div>
    <div class="footer">
        &copy; ${new Date().getFullYear()} Stone Market
    </div>
</body>
</html>

    `,
      doctor.email,
      true
    );

    const reset_token = this.libService.signToken({ hash: hashed_random, user_id: doctor.id }, "10m");

    return { reset_token };
  }

  async confirmCodeForForgetPassword(body: ConfirmCodeDto, token_payload: IResetToken) {
    if (!(await compare(body.code, token_payload.hash)))
      throw new HttpException({ message: "code isn't matches", code: 4003 }, HttpStatus.UNAUTHORIZED);

    const change_password_token = this.libService.signToken({ user_id: token_payload.user_id, confirm: true }, "3m");

    return { change_password_token };
  }

  async changePasswordForForgetPassword(body: ChangePasswordDto, token_payload: IChangePasswordToken) {
    const hashedPassword = await hash(body.password, await genSalt(10));

    await this.dbService.user.update({ data: { password: hashedPassword }, where: { id: token_payload.user_id } });

    return REQUEST_HAS_ENDED_SUCCESSFULLY;
  }
}
