import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  userRolesEnum,
  userRolesType,
} from 'src/utilities/types/userRoles.type';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, default: 'user', enum: userRolesEnum })
  role: userRolesType;

  @Prop({ type: String, required: 'password is required' })
  password: string;

  @Prop({
    type: String,
    unique: true,
    required: [true, 'phone number is required'],
    trim: true,
  })
  phoneNumber: string;

  @Prop({ type: String, trim: true, lowercase: true })
  name: string;

  @Prop({
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middlewares
UserSchema.pre<UserDocument>(`save`, async function (next) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 12);

  next();
});

// Indexes
UserSchema.index({ phoneNumber: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

// Virtual Properties
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

UserSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user',
});
