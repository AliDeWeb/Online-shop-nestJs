import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/loginUser.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly JwtService: JwtService,
  ) {}

  async createUser(
    createUserData: CreateUserDto,
  ): Promise<{ message: string; token: string }> {
    const isAnyUserExistWithThisPhoneNumber =
      await this.UserRepository.findUserByPhoneNumber(
        createUserData.phoneNumber,
      );

    if (isAnyUserExistWithThisPhoneNumber) {
      throw new BadRequestException('there is a user with this phone number');
    }

    if (
      createUserData.email &&
      (await this.UserRepository.findUserByEmail(createUserData.email))
    ) {
      throw new BadRequestException('there is a user with this email');
    }

    const user = await this.UserRepository.createUser(createUserData);

    const payload = {
      id: (user as any)._id,
      phoneNumber: user.phoneNumber,
    };

    const token = await this.JwtService.signAsync(payload);

    return {
      message: `welcome, you signed up successfully as ${user.phoneNumber}`,
      token,
    };
  }

  async loginUser(loginUserData: LoginUserDto) {
    const isAnyUserExistWithThisPhoneNumber =
      await this.UserRepository.findUserByPhoneNumber(
        loginUserData.phoneNumber,
      );

    if (!isAnyUserExistWithThisPhoneNumber) {
      throw new UnauthorizedException('wrong phone number or password');
    }

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
