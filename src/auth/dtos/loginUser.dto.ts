import { IsString, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'phone number should be a string' })
  @Matches(/^09[0-9]{9}$/, { message: 'provide a valid phone number' })
  phoneNumber: string;

  @IsString({ message: 'password should be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password: string;
}
