import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  Matches,
} from 'class-validator';
import { iranPhoneNumberValidator } from 'src/utilities/regex/phoneNumbersRegex';

export class CreateUserDto {
  @IsString({ message: 'password should be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password: string;

  @IsString({ message: 'phone number should be a string' })
  @Matches(iranPhoneNumberValidator, {
    message: 'provide a valid phone number',
  })
  phoneNumber: string;

  @IsString({ message: 'name should be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  @IsOptional()
  name: string;

  @IsEmail({}, { message: 'provide a valid email' })
  @IsOptional()
  email: string;
}
