import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findUserById(id: Schema.Types.ObjectId): Promise<User | null> {
    const user = this.userModel.findById(id).exec();

    return user;
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = this.userModel.findOne({ phoneNumber }).exec();

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email }).exec();

    return user;
  }

  async updateUserById(
    id: Schema.Types.ObjectId,
    attrs: Partial<User>,
  ): Promise<User | null> {
    const user = this.userModel
      .findByIdAndUpdate(id, attrs, { new: true })
      .exec();

    return user;
  }
}
