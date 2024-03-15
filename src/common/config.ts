import { Transform, plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  validate,
} from 'class-validator';

class Config {
  @IsNotEmpty()
  @IsString()
  DB_URL: string;

  @IsNotEmpty()
  @IsString()
  NODE_ENV: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  @IsBoolean()
  EMPTY_DB = false;

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  @IsBoolean()
  DB_SSL = false;

  @IsNotEmpty()
  @IsString()
  SESSION_SECRET: string;

  @IsNotEmpty()
  @IsString()
  BASE_URL: string;
}

export let config: Config;

export const setupConfig = async () => {
  config = plainToInstance(Config, process.env);
  const [error] = await validate(config, { whitelist: true });
  if (error) return error;
};
