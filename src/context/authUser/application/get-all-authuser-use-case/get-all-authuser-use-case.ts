import { Injectable } from 'src/context/shared/dependency-injection/injectable';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { PrimitiveAuthUser } from '../../domain/authuser.model';

@Injectable()
export class GetAllAuthUserUseCase {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async execute(): Promise<{ authUsers: PrimitiveAuthUser[] }> {
    const authUsers = await this.authUserRepository.findAll();
    return { authUsers: authUsers.map((authUser) => authUser.toValue()) };
  }
}
