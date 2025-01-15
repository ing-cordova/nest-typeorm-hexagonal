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

  async findAll(): Promise<SubRegion[]> {
    return this.repository.find({ relations: ["region"] });
  }

  async findByRegionId(regionId: number): Promise<SubRegion[]> {
    return this.repository.find({
      where: { region_id: regionId },
      relations: ["region"],
    });
  }
}
