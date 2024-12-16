import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbModule } from "./db/db.module";
import { ConfigModuleDto } from "./lib/dto";
import { LibModule } from "./lib/lib.module";
import { AuthModule } from "./routes/auth/auth.module";
import { DoctorModule } from "./routes/doctor/doctor.module";
import { SocketModule } from "./socket/socket.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DbModule,
    ConfigModule.forRoot(ConfigModuleDto),
    LibModule,
    AuthModule,
    DoctorModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
