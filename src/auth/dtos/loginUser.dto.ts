import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString({ message: 'phone number should be a string' })
  @Matches(/^09[0-9]{9}$/, { message: 'provide a valid phone number' })
  @ApiProperty({
    minLength: 11,
    maxLength: 11,
    default: '09123456789',
    example: '09123456789',
    description: 'phone number must be started with 09...',
  })
  phoneNumber: string;

  @IsString({ message: 'password should be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @ApiProperty({
    minLength: 8,
    default: '12345678',
    example: '12345678',
  })
  password: string;
}
