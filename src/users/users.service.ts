import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from 'src/schemas/user/user.schema';
import { Schema } from 'mongoose';
import { iranPhoneNumberValidator } from 'src/utilities/regex/phoneNumbersRegex';
import { emailValidator } from 'src/utilities/regex/emailRegex';

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
    if (!phoneNumber.match(iranPhoneNumberValidator))
      throw new BadRequestException('phone number is not valid');

    const user = await this.UserRepository.findUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw new BadRequestException('there is no user with this phone number');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    if (!email.match(emailValidator))
      throw new BadRequestException('email is not valid');

    const user = await this.UserRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('there is no user with this email');
    }

    return user;
  }

  async updateMe(id: Schema.Types.ObjectId, attrs: Partial<User>) {
    const updatedUser = await this.UserRepository.updateUserById(id, attrs);

    if (!updatedUser) throw new BadRequestException('id is not valid');

    return updatedUser;
  }
}
