import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';
import { userRolesType } from 'src/utilities/types/userRoles.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findUserById(id: Schema.Types.ObjectId): Promise<User | null> {
    const user = this.userModel
      .findById(id)
      .populate({
        path: 'orders',
        select: '-user -__v',
      })
      .exec();

    return user;
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = this.userModel
      .findOne({ phoneNumber })
      .populate({
        path: 'orders',
        select: '-user -__v',
      })
      .exec();

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.userModel
      .findOne({ email })
      .populate({
        path: 'orders',
        select: '-user -__v',
      })
      .exec();

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

  async updateUserRole(id: Schema.Types.ObjectId, role: userRolesType) {
    const newUserInfo = this.userModel.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    );

    return newUserInfo;
  }
}
