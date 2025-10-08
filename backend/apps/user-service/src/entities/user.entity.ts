export class UserEntity {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

