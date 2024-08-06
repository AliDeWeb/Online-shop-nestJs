import { IsString } from 'class-validator';
import { orderStatus } from 'src/utilities/types/orderStatus.type';

export class UpdateOrderStatusDto {
  @IsString({ message: 'not allowed status' })
  status: orderStatus;
}
