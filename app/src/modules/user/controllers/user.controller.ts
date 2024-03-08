import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { User } from '../schemas/user.schema';
import { SkipThrottle } from '@nestjs/throttler';

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('Users')
export class UsersController {
  constructor(private service: UserService) {}

  @ApiOkResponse({ type: 'string' })
  @Post()
  async createUser(@Body() payload: CreateUserDto) {
    return this.service.createUser(payload);
  }

  @UseGuards(AuthGuard)
  @SkipThrottle()
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @Get('/me')
  async getProfile(@Request() req) {
    return req.user;
  }
}
