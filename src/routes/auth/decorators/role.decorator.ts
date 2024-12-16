import { SetMetadata } from "@nestjs/common";
import { user_types } from "src/lib/types";

export const Roles = (...roles: user_types[]) => SetMetadata("roles", roles);
