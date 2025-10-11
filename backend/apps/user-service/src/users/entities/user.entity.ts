import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ example: 'uuid-123', description: 'User unique identifier' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name', nullable: true })
  name: string | null;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z', description: 'Account creation date' })
  createdAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

