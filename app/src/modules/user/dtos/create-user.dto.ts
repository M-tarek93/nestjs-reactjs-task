import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

const passwordPattern =
  '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    maxLength: 100,
    example: 'John Doe',
  })
  @IsString()
  @MaxLength(100)
  name: string;

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
    pattern: passwordPattern,
    example: 'p@ssw0rd',
  })
  @IsString()
  @Matches(passwordPattern)
  password: string;
}
