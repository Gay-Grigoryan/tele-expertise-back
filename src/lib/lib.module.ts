import { JwtModule } from "@nestjs/jwt";
import { Global, Module } from "@nestjs/common";
import { LibService } from "./lib.service";

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [LibService],
  exports: [LibService]
})
export class LibModule {}
