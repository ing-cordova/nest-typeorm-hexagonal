import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { Region } from "../../domain/region.model";
import { RegionRepository } from "../../domain/region.repository";

@Injectable()
export class TypeOrmRegionRepository extends RegionRepository {
  constructor(
    @InjectRepository(Region)
    private readonly repository: Repository<Region>
  ) {
    super();
  }

  async findAll(): Promise<Region[]> {
    return this.repository.find();
  }
}
