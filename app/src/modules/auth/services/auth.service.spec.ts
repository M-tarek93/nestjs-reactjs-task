import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userServiceMock: jest.Mocked<UserService>;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userServiceMock = module.get(UserService);
    jwtServiceMock = module.get(JwtService);
  });

  const mockUser = { _id: 'userId', comparePassword: jest.fn() };

  it('should generate an access token for valid credentials', async () => {
    const loginDto: LoginDto = {
      email: 'testuser@example.com',
      password: 'testpassword',
    };

    const mockAccessToken = 'mockAccessToken';

    userServiceMock.findOne.mockResolvedValueOnce(mockUser as any);
    mockUser.comparePassword.mockResolvedValueOnce(true);
    jwtServiceMock.sign.mockReturnValueOnce(mockAccessToken);

    const result = await authService.login(loginDto);

    expect(result).toEqual({ access_token: mockAccessToken });
    expect(userServiceMock.findOne).toHaveBeenCalledWith({
      email: loginDto.email,
    });
    expect(mockUser.comparePassword).toHaveBeenCalledWith(loginDto.password);
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({ sub: mockUser._id });
  });

  it('should throw UnauthorizedException for a user not found', async () => {
    const loginDto: LoginDto = {
      email: 'nonexistentuser@example.com',
      password: 'testpassword',
    };

    userServiceMock.findOne.mockResolvedValueOnce(undefined);

    await expect(authService.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(userServiceMock.findOne).toHaveBeenCalledWith({
      email: loginDto.email,
    });
  });

  it('should throw UnauthorizedException for incorrect password', async () => {
    const loginDto: LoginDto = {
      email: 'testuser@example.com',
      password: 'incorrectpassword',
    };
    const mockUser = { _id: 'userId', comparePassword: jest.fn() };

    userServiceMock.findOne.mockResolvedValueOnce(mockUser as any);
    mockUser.comparePassword.mockResolvedValueOnce(false);

    await expect(authService.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(userServiceMock.findOne).toHaveBeenCalledWith({
      email: loginDto.email,
    });
    expect(mockUser.comparePassword).toHaveBeenCalledWith(loginDto.password);
  });
});
