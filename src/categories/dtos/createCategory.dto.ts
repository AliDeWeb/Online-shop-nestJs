import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString({ message: 'title should be a string' })
  @ApiProperty({ example: 'laptop', default: 'laptop' })
  @Transform(({ value }: { value: string }) => {
    return value.trim().toLowerCase();
  })
  title: string;
}
