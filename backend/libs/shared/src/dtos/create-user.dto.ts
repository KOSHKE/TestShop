import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'user@example.com', 
    description: 'User email address' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    example: 'SecurePassword123', 
    description: 'User password',
    minLength: 6 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: 'John Doe', 
    description: 'User full name',
    required: false 
  })
  @IsString()
  @IsOptional()
  name?: string;
}

