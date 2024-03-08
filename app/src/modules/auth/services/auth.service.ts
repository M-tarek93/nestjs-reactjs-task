import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(params: LoginDto): Promise<any> {
    const { email, password } = params;
    const user = await this.usersService.findOne({ email });
    if (!user) throw new UnauthorizedException();

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({ sub: user._id }),
    };
  }
}
