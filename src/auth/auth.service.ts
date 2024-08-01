import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserRepository } from './auth.repository';
@Injectable()
export class AuthService {
  constructor(private readonly UserRepository: UserRepository) {}

  async createUser(createUserData: CreateUserDto): Promise<string> {
    await this.UserRepository.createUser(createUserData);
    return 'welcome, you signed up successfully';
  }
}
