import { REQUEST_HAS_ENDED_SUCCESSFULLY } from "../../lib/templates";
import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { genSalt, hash } from "bcryptjs";
import { GetDoctorsQueryDto } from "src/lib/dto";
import { Prisma, user_types } from "@prisma/client";
import { CreateDoctorDto, UpdateDoctorDto } from "./dto";

@Injectable()
export class DoctorService {

  
  constructor(private dbService: DbService) {}
  
  async create(createDoctorDto: CreateDoctorDto) {
    const { password, hospital_id, profession_id, ...data } = createDoctorDto;
    const hashedPassword = await hash(password, await genSalt(10));

    await this.dbService.user.create({
      data: {
        ...data,
        password: hashedPassword,
        type: user_types.doctor,
        doctor: {
          create: {
            hospital: {
              connect: { id: hospital_id }
            },
            profession: {
              connect: { id: profession_id }
            }
          }
        }
      }
    });

    return REQUEST_HAS_ENDED_SUCCESSFULLY;
  }


  async findAll(query: GetDoctorsQueryDto, userId: string) {
    const { page, rows_per_page, query: search, country_id, city_id, hospital_id, profession_id } = query;
    const condition: Prisma.UserWhereInput = {
      OR: [{ name: { contains: search } }, { phone: { contains: search } }, { email: { contains: search } }],
      type: user_types.doctor,
      ...(country_id || city_id || hospital_id || profession_id
        ? {
            doctor: {
              ...(hospital_id
                ? { hospital: { id: hospital_id } }
                : {
                    ...(country_id || city_id
                      ? { hospital: { city: { ...(country_id ? { country_id } : null), ...(city_id ? { id: city_id } : null) } } }
                      : {})
                  }),
              ...(profession_id ? { profession: { id: profession_id } } : {})
            }
          }
        : {}),
      id: { not: userId }
    };

    const [items, count] = await Promise.all([
      this.dbService.user.findMany({
        where: condition,
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          doctor: {
            select: {
              hospital: {
                select: {
                  id: true,
                  city: {
                    select: {
                      id: true,
                      country_id: true
                    }
                  }
                }
              },
              profession_id: true
            }
          }
        },
        skip: page * rows_per_page - rows_per_page,
        take: +rows_per_page
      }),
      this.dbService.user.count({ where: condition })
    ]);

    return {
      items: items.map(
        ({
          doctor: {
            profession_id,
            hospital: {
              id: hospital_id,
              city: { id, country_id }
            }
          },
          ...el
        }) => ({ ...el, hospital_id: hospital_id, profession_id: profession_id, cityId: id, countryId: country_id })
      ),
      pages: Math.ceil(count / rows_per_page)
    };
  }

  async findOne(id: string) {
    const doctor = await this.dbService.user.findUniqueOrThrow({
      where: { id, type: user_types.doctor },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true
      }
    });

    return { item: doctor };
  }

  async update(id: string, body: UpdateDoctorDto) {
    const { password, hospital_id, profession_id, ...data } = body;

    let hashedPassword = ""
  
    if (password) {
      hashedPassword = await hash(password, await genSalt(10));
    }
  
    await this.dbService.user.update({ where: { id }, data: {
      ...data,
      password: hashedPassword,
      type: user_types.doctor,
      doctor: {
        update: {
          hospital: {
            connect: { id: hospital_id }
          },
          profession: {
            connect: { id: profession_id }
          }
        }
      }
    } });
  
    return REQUEST_HAS_ENDED_SUCCESSFULLY;
  }
  
  // async remove(id: string) {
  //   await this.dbService.doctor.delete({ where: { id } });
  //   return REQUEST_HAS_ENDED_SUCCESSFULLY;
  // }
  async remove(id: string) {
    // Հաշվի առնելով, որ `doctor` մոդելը կապված է `user`-ի հետ, նախ պետք է գտնել տվյալները
    const doctor = await this.dbService.user.findUnique({
      where: { id },
      select: { doctor: true }
    });
  
    // Եթե doctor գտվել է, ապա ջնջում ենք նաև `user`-ը
    if (doctor) {
      // Նախ ջնջել `doctor`-ը
      await this.dbService.doctor.delete({ where: { id } });
  
      // Հետո ջնջել `user`-ը
      await this.dbService.user.delete({ where: { id } });
    }
  
    return REQUEST_HAS_ENDED_SUCCESSFULLY;
  }
}
