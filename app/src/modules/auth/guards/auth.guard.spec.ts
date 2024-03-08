import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
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
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtServiceMock = module.get(JwtService);
  });

  it('should pass authentication with a valid token', async () => {
    const mockToken = 'validToken';
    const mockPayload = { sub: 'userId' };

    jwtServiceMock.verifyAsync.mockResolvedValueOnce(mockPayload);

    const result = await authGuard.canActivate({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${mockToken}`,
          },
        }),
      }),
    } as any);

    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException with an invalid token', async () => {
    const mockToken = 'invalidToken';

    jwtServiceMock.verifyAsync.mockRejectedValueOnce(
      new Error('Invalid token'),
    );

    await expect(
      authGuard.canActivate({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: `Bearer ${mockToken}`,
            },
          }),
        }),
      } as any),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException with a missing token', async () => {
    await expect(
      authGuard.canActivate({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
          }),
        }),
      } as any),
    ).rejects.toThrow(UnauthorizedException);
  });
});
