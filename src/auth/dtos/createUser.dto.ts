import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { iranPhoneNumberValidator } from 'src/utilities/regex/phoneNumbersRegex';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({ message: 'password should be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @Transform(({ value }) => value.trim())
  @ApiProperty({ minLength: 8, default: '12345678', example: '12345678' })
  password: string;

  @IsString({ message: 'phone number should be a string' })
  @Matches(iranPhoneNumberValidator, {
    message: 'provide a valid phone number',
  })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    minLength: 11,
    maxLength: 8,
    default: '0912345678',
    example: '0912345678',
    description: 'phone number must be started with 09...',
  })
  phoneNumber: string;

  @IsString({ message: 'name should be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({
    minLength: 3,
    default: 'John Morgan',
    example: 'John Morgan',
    description: 'this field is optional',
    required: false,
  })
  name: string;

  @IsEmail({}, { message: 'provide a valid email' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({
    default: 'John@gmail.com',
    example: 'John@gmail.com',
    description: 'this field is optional',
    required: false,
  })
  email: string;
}
