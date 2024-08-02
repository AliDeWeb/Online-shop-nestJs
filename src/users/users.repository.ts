import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = this.userModel.findOne({ phoneNumber });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email });

    return user;
  }
}
