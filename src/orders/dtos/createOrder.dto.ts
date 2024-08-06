import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Schema } from 'mongoose';

class OrderProductDto {
  @IsMongoId({ message: 'product must be a valid ObjectId' })
  @ApiProperty({ description: 'product must be a valid ObjectId' })
  product: Schema.Types.ObjectId;

  @ApiProperty({ description: 'count of the product' })
  @Transform(({ value }: { value: string }) => Number(value))
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'count must be a valid number' },
  )
  count: number;
}

export class CreateOrdersDto {
  @ApiProperty({ description: 'user must be a valid ObjectId' })
  user: Schema.Types.ObjectId;

  @IsString({ message: 'address must be a string' })
  @ApiProperty({ description: 'address of the order' })
  address: string;

  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @ApiProperty({ type: [OrderProductDto], description: 'array of products' })
  products: OrderProductDto[];
}
