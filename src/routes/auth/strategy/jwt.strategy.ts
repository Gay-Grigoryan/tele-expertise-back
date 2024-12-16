import { DbService } from "src/db/db.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { user_types } from "src/lib/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService, private db: DbService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("JWT_SECRET")
    });
  }

  async validate(payload: { id: string; type: user_types; iat: number; exp: number }) {
    const result = await this.db.user.findUnique({
      where: { id: payload.id, type: payload.type }
    });

    return result;
  }
}
