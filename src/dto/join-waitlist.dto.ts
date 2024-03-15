import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class JoinWaitlistDTO {
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  track: string;

  @ApiProperty({ required: true, enum: ['male', 'female'] })
  @IsNotEmpty()
  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  country: string;
}
