import { Expose, Type } from 'class-transformer';
import { ProductDocument } from 'src/schemas/product/product.schema';
import { userRolesType } from 'src/utilities/types/userRoles.type';

export class OrderProductDto {
  @Expose()
  count: number;

  @Expose()
  product: ProductDocument;
}

export class OrderDto {
  @Expose()
  status: string;

  @Expose()
  @Type(() => OrderProductDto)
  products: OrderProductDto[];

  @Expose()
  _id: string;
}

export class UserDto {
  @Expose()
  phoneNumber: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: userRolesType;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => OrderDto)
  orders: OrderDto[];
}
