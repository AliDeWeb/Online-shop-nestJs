import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { iranPhoneNumberValidator } from 'src/utilities/regex/phoneNumbersRegex';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @UseGuards(ProtectedRouteGuard)
  @Get('me')
  async getMe(@Request() request) {
    const user = await this.UsersService.findUserById(request.user.id);

    user['updatedAt'] = undefined;
    user['password'] = undefined;
    user['__v'] = undefined;

    return user;
  }

  @Get('get-user-by-phone-number/:phoneNumber')
  async getUserByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    if (!phoneNumber.match(iranPhoneNumberValidator))
      throw new BadRequestException('phone number is not valid');

    const user = await this.UsersService.findUserByPhoneNumber(phoneNumber);

    user['updatedAt'] = undefined;
    user['password'] = undefined;
    user['__v'] = undefined;

    return user;
  }

  @Get('get-user-by-email/:email')
  async getUserByEmail(@Param('email') email: string) {
    if (!email.match(emailValidator))
      throw new BadRequestException('email is not valid');

    const user = await this.UsersService.findUserByEmail(email);

    user['updatedAt'] = undefined;
    user['password'] = undefined;
    user['__v'] = undefined;

    return user;
  }
}
