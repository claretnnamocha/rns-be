import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class BecomeMentorDTO {
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

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  linkedInProfile: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  resume: string;
}
