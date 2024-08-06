export type orderStatus =
  | 'review'
  | 'in progress'
  | 'has been posted'
  | 'received';

export const orderStatusEnum: orderStatus[] = [
  'review',
  'in progress',
  'has been posted',
  'received',
];
