import { DbService } from "src/db/db.service";
import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";

@Controller()
export class AppController {
  constructor(private dbService: DbService) {}

  @Get("/ping")
  ping(): string {
    return "ping-ping";
  }

  @Get("countries")
  async getCountries() {
    return this.dbService.country.findMany({
      select: {
        id: true,
        name: true
      }
    });
  }

  @Get("cities")
  async getCities(@Query("country_id", ParseIntPipe) country_id: number) {
    return this.dbService.city.findMany({
      select: {
        id: true,
        name: true
      },
      where: {
        country_id
      }
    });
  }

  @Get("hospitals")
  async getHospitals(@Query("city_id", ParseIntPipe) city_id: number) {
    return this.dbService.hospital.findMany({
      select: {
        id: true,
        name: true
      },
      where: {
        city_id
      }
    });
  }

  @Get("professions")
  async getProfessions(@Query("hospital_id", ParseIntPipe) hospital_id: number) {
    return this.dbService.profession.findMany({
      select: {
        id: true,
        name: true
      }
      
    });
  }
}
