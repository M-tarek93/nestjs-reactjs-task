import { Test, TestingModule } from '@nestjs/testing';
import { SinonSandbox, createSandbox } from 'sinon';
import { UsersController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  let usersController: UsersController;
  let userService: UserService;
  let sandbox: SinonSandbox;

  beforeEach(async () => {
    sandbox = createSandbox();
    userService = sandbox.createStubInstance(UserService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'test user',
        email: 'testuser@example.com',
        password: 'testpassword',
      };
      userService.createUser = jest.fn();
      await usersController.createUser(createUserDto);

      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('getProfile', () => {
    it('should return the user profile for an authenticated user', async () => {
      const mockUser = {
        name: 'test user',
        email: 'testuser@example.com',
        password: 'hashedpassword',
      };
      const mockRequest: Request = {
        user: mockUser,
      } as unknown as Request;

      const result = await usersController.getProfile(mockRequest);

      expect(result).toEqual(mockUser);
    });
  });
});
