import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test user',
        email: 'testuser@example.com',
        password: 'testpassword',
      };
      const createSpy = jest
        .spyOn(userModel, 'create')
        .mockResolvedValueOnce({} as any);

      const result = await userService.createUser(createUserDto);

      expect(createSpy).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe('User created successfully');
    });

    it('should handle conflict exception when creating a duplicate user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test user',
        email: 'testuser@example.com',
        password: 'testpassword',
      };
      const createSpy = jest.spyOn(userModel, 'create').mockRejectedValueOnce({
        code: 11000, // Duplicate key error
      });

      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle bad request exception for other errors during user creation', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test user',
        email: 'testuser@example.com',
        password: 'testpassword',
      };
      const createSpy = jest
        .spyOn(userModel, 'create')
        .mockRejectedValueOnce(new Error('Some unexpected error'));

      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should find a user successfully', async () => {
      const findSpy = jest.spyOn(userModel, 'findOne').mockResolvedValueOnce({
        _id: 'userId',
        name: 'test user',
        email: 'testuser@example.com',
      });

      const result = await userService.findOne({
        email: 'testuser@example.com',
      });

      expect(findSpy).toHaveBeenCalledWith(
        { email: 'testuser@example.com' },
        {},
        { sanitizeFilter: true },
      );
      expect(result).toEqual({
        _id: 'userId',
        name: 'test user',
        email: 'testuser@example.com',
      });
    });

    it('should handle errors during user lookup', async () => {
      const findSpy = jest
        .spyOn(userModel, 'findOne')
        .mockRejectedValueOnce(new Error('Some unexpected error'));

      await expect(
        userService.findOne({ email: 'testuser@example.com' }),
      ).rejects.toThrow(NotFoundException);
      expect(findSpy).toHaveBeenCalledWith(
        { email: 'testuser@example.com' },
        {},
        { sanitizeFilter: true },
      );
    });
  });
});
