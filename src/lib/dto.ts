import { Transform, Type } from "class-transformer";
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import * as Joi from "@hapi/joi";
import { applyDecorators } from "@nestjs/common";

export const ConfigModuleDto = {
  isGlobal: true,
  envFilePath: ".env",
  validationSchema: Joi.object({
    DATABASE_URL: Joi.string().required(),
    PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
    DEFAULT_TICKETS_COUNT: Joi.number().required(),
    IDRAM_ID: Joi.string().required(),
    IDRAM_SECRET_KEY: Joi.string().required()
  })
};

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rows_per_page?: number = 10;
}

export class PaginationWithSearchQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  query?: string = "";
}

export class GetDoctorsQueryDto extends PaginationWithSearchQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  country_id?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  city_id?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  hospital_id?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  profession_id?: number;
}

export class SearchQueryDro {
  @IsOptional()
  @IsString()
  query?: string = "";
}

export function IfNotExist(key: string) {
  return applyDecorators(
    ValidateIf(o => [undefined, null].includes(o[key])),
    Transform(({ value, obj }) => ([undefined, null].includes(obj[key]) ? value : undefined))
  );
}

export function TransformJsonParse() {
  return applyDecorators(
    Transform(
      ({ value }) => {
        try {
          return JSON.parse(value);
        } catch (e) {
          return 0;
        }
      },
      { toClassOnly: true }
    ),
    IsObject({ message: arg => `${arg.property} must be json string` })
  );
}
