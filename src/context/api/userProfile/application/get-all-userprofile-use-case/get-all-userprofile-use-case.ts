import { PaginationService } from 'src/context/services/pagination/pagination.service';
import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { UserProfile } from '../../domain/userprofile.model';
import { UserProfileRepository } from '../../domain/userprofile.repository';

@Injectable()
export class GetAllUserProfileUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepository, private readonly paginationService: PaginationService) { }

  async execute(page: number, pageSize: number): Promise<{ data: UserProfile[], total: number, nextPage: number | null, prevPage: number | null, limit: number }> {
    const { data, total} = await this.userProfileRepository.findAllWithPagination(page, pageSize);
    return this.paginationService.paginate(data, total, page, pageSize);
  }
}
