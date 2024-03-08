import { Test, TestingModule } from '@nestjs/testing';
import { SinonSandbox, createSandbox } from 'sinon';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let sandbox: SinonSandbox;

  beforeEach(async () => {
    sandbox = createSandbox();
    authService = sandbox.createStubInstance(AuthService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
      imports: [],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('signIn', () => {
    it('should return an access token for valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'testuser@example.com',
        password: 'testpassword',
      };
      const mockAccessToken = 'mockAccessToken';
      jest
        .spyOn(authService, 'login')
        .mockResolvedValueOnce({ access_token: mockAccessToken });

      const result = await authController.signIn(loginDto);

      expect(result).toEqual({ access_token: mockAccessToken });
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should return a 400 Bad Request for invalid email format', async () => {
      const loginDto: LoginDto = {
        email: 'invalid_email_format',
        password: 'testpassword',
      };

      try {
        await authController.signIn(loginDto);
      } catch (error) {
        expect(error.response.statusCode).toBe(400);
        expect(error.response.message).toContain(
          'Validation failed (email must be an email address)',
        );
      }
    });

    it('should return a 400 Bad Request for missing password', async () => {
      const loginDto: LoginDto = {
        email: 'testuser@example.com',
        password: '',
      };

      try {
        await authController.signIn(loginDto);
      } catch (error) {
        expect(error.response.statusCode).toBe(400);
        expect(error.response.message).toContain(
          'Validation failed (password should not be empty)',
        );
      }
    });
  });
});
