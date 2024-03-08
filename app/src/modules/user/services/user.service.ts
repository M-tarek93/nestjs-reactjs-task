import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async createUser(payload: CreateUserDto): Promise<string> {
    try {
      await this.userModel.create(payload);
      return 'User created successfully';
    } catch (error) {
      Logger.error(`[User Service] - CreateUser: ${error}`);
      throw error.code === 11000
        ? new ConflictException('User already exists')
        : new BadRequestException('Create user failed');
    }
  }

  public async findOne(params: FilterQuery<User>): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne(
        params,
        {},
        { sanitizeFilter: true },
      );
      return user;
    } catch (error) {
      Logger.error(`[User Service] - findOne: ${error}`);
      throw new NotFoundException('User not found');
    }
  }
}
