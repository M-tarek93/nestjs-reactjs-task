import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    required: true,
    format: 'email',
    example: 'username@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    format: 'password',
    example: 'p@ssw0rd',
  })
  @IsString()
  password: string;
}
