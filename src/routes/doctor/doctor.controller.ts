import { GetUser } from "../auth/decorators/user.decorator";
import { GetDoctorsQueryDto, PaginationWithSearchQueryDto } from "../../lib/dto";
import { Controller, Get, Post, Body, Param, Delete, Put, Query } from "@nestjs/common";
import { Auth } from "../auth/decorators/auth.decorator";
import { Roles } from "../auth/decorators/role.decorator";
import { TUser, user_types } from "src/lib/types";
import { DbService } from "src/db/db.service";
import { DoctorService } from "./doctor.service";
import { Doctor, User } from "@prisma/client";
import { CreateDoctorDto, UpdateDoctorDto } from "./dto";

@Auth()
@Controller("doctors")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService, private dbService: DbService) {}

  @Roles(user_types.doctor)
  @Get("my-info")
  getDoctorInfo(@GetUser() user: TUser<Doctor>) {
    return { info: user };
  }

  @Roles(user_types.super_admin)
  @Post()
  create(@Body() body: CreateDoctorDto) {
    return this.doctorService.create(body);
  }

  @Roles(user_types.super_admin, user_types.doctor)
  @Get()
  findAll(@Query() query: GetDoctorsQueryDto, @GetUser() user: User) {
    return this.doctorService.findAll(query, user.id);
  }
  @Roles(user_types.super_admin, user_types.doctor)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorService.findOne(id);
  }

  @Roles(user_types.super_admin)
  @Put(":id")
  update(@Param("id") id: string, @Body() body: UpdateDoctorDto) {
    return this.doctorService.update(id, body);
  }

  @Roles(user_types.super_admin)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorService.remove(id);
  }
}
