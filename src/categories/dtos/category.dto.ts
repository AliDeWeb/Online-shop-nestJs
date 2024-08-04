import { Product } from '../../schemas/product/product.schema';
import { Schema } from 'mongoose';
import { Expose } from 'class-transformer';

export class categoryDto {
  @Expose()
  title: string;

  @Expose()
  products: Product[];

  @Expose()
  _id: Schema.Types.ObjectId;
}
