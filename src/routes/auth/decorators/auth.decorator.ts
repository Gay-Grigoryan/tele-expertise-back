import { RolesGuard } from "./../guards/roles.guard";
import { JwtGuard } from "./../guards/jwt.guard";
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { user_types } from "src/lib/types";

export function Auth(...roles: user_types[]) {
  return applyDecorators(SetMetadata("roles", roles), UseGuards(JwtGuard, RolesGuard));
}
