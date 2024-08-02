import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';
import { Schema } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async findUserById(id: Schema.Types.ObjectId): Promise<User | null> {
    const user = this.userModel.findById(id);

    return user;
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = this.userModel.findOne({ phoneNumber });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email });

    return user;
  }
}
