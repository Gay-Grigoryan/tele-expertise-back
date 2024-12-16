import { DbService } from "./../../../db/db.service";
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FORBIDDEN } from "src/lib/error-codes";
import { user_types } from "src/lib/types";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private dbService: DbService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<user_types[]>("roles", context.getHandler()) || [];

    const rolesClass = this.reflector.get<user_types[]>("roles", context.getClass()) || [];

    if (!roles.length && !rolesClass.length) {
      return true;
    }

    const allRoles = [...roles, ...rolesClass];

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!allRoles.includes(user.type)) {
      throw new HttpException(FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
