import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { SubRegion } from "../../domain/sub-region.model";
import { SubRegionRepository } from "../../domain/sub-region.repository";

@Injectable()
export class TypeOrmSubRegionRepository extends SubRegionRepository {
  constructor(
    @InjectRepository(SubRegion)
    private readonly repository: Repository<SubRegion>
  ) {
    super();
  }

  async findAll(filter: Partial<SubRegion> = {}): Promise<SubRegion[]> {
    return this.repository.find({ where: filter, relations: ["region"] });
  }
}
