import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @MinLength(3, { message: 'title must have 3 character at least' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({
    minLength: 3,
    default: 'Body Spray Golden',
    example: 'Body Spray Golden',
  })
  title: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({
    default: 'Body Spray Golden is the best body spray in the world',
    example: 'Body Spray Golden is the best body spray in the world',
  })
  description: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'price must be a number' },
  )
  @ApiProperty({
    type: Number,
    default: 60.9,
    example: 60.9,
  })
  price: number;

  @ApiProperty({
    type: File,
    required: true,
    description: 'upload single image in types `jpg | jpeg | png`',
  })
  images: string[];
}
