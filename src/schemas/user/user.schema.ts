import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: 'password is required' })
  password: string;

  @Prop({ type: String, required: 'phone number is required' })
  phoneNumber: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
