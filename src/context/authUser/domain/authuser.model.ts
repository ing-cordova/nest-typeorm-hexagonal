import { randomUUID } from 'crypto';

export interface PrimitiveAuthUser {
  id: string;
  username: string;
  email: string;
  password: string;
}
export class AuthUser {
  constructor(private attributes: PrimitiveAuthUser) {}

  static create(createAuthUser: {
    username: string;
    email: string;
    password: string;
  }): AuthUser {
    return new AuthUser({
      id: randomUUID(),
      username: createAuthUser.username,
      email: createAuthUser.email,
      password: createAuthUser.password,
    });
  }

  toValue(): PrimitiveAuthUser {
    return {
      id: this.attributes.id,
      username: this.attributes.username,
      email: this.attributes.email,
      password: this.attributes.password,
    };
  }
}
