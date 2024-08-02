import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from 'src/schemas/user/user.schema';
import { Schema } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly UserRepository: UserRepository) {}
  async findUserById(id: Schema.Types.ObjectId): Promise<User | null> {
    const user = await this.UserRepository.findUserById(id);

    if (!user) {
      throw new BadRequestException('there is no user with this information');
    }

    return user;
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.UserRepository.findUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw new BadRequestException('there is no user with this phone number');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.UserRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('there is no user with this email');
    }

    return user;
  }
}
