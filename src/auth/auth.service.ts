import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/loginUser.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly AuthRepository: AuthRepository,
    private readonly UsersService: UsersService,
    private readonly JwtService: JwtService,
  ) {}

  async createUser(
    createUserData: CreateUserDto,
  ): Promise<{ message: string; token: string }> {
    try {
      let user = await this.AuthRepository.createUser(createUserData);

      const payload = {
        id: (user as any)._id,
        phoneNumber: user.phoneNumber,
      };

      const token = await this.JwtService.signAsync(payload);

      return {
        message: `welcome, you signed up successfully as ${user.phoneNumber}`,
        token,
      };
    } catch (err) {
      throw new BadRequestException('this user is already exist');
    }
  }

  async loginUser(loginUserData: LoginUserDto) {
    const isAnyUserExistWithThisPhoneNumber =
      await this.UsersService.findUserByPhoneNumber(loginUserData.phoneNumber);

    const isPasswordCorrect = await bcrypt.compare(
      loginUserData.password,
      isAnyUserExistWithThisPhoneNumber.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('wrong phone number or password');
    }

    const payload = {
      id: (isAnyUserExistWithThisPhoneNumber as any)._id,
      phoneNumber: isAnyUserExistWithThisPhoneNumber.phoneNumber,
    };

    const token = await this.JwtService.signAsync(payload);

    return {
      message: `welcome, you logged in successfully as ${isAnyUserExistWithThisPhoneNumber.phoneNumber}`,
      token,
    };
  }
}
