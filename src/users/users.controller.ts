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
    if (!phoneNumber.match(/^09[0-9]{9}$/))
      throw new BadRequestException('phone number is not valid');

    const user = await this.UsersService.findUserByPhoneNumber(phoneNumber);

    user['updatedAt'] = undefined;
    user['password'] = undefined;
    user['__v'] = undefined;

    return user;
  }

  @Get('get-user-by-email/:email')
  async getUserByEmail(@Param('email') email: string) {
    if (
      !email.match(
        /^(?=.{1,256})(?=.{1,64}@.{1,255}$)(?=\S+$)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/,
      )
    )
      throw new BadRequestException('email is not valid');

    const user = await this.UsersService.findUserByEmail(email);

    user['updatedAt'] = undefined;
    user['password'] = undefined;
    user['__v'] = undefined;

    return user;
  }
}
