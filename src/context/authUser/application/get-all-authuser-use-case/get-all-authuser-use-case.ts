import { Injectable } from 'src/context/shared/dependency-injection/injectable';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { AuthUser } from '../../domain/authuser.model';

@Injectable()
export class GetAllAuthUserUseCase {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async execute(): Promise<{ authUsers: AuthUser[] }> {
    const authUsers = await this.authUserRepository.findAll();
    return { authUsers };
  }
}
