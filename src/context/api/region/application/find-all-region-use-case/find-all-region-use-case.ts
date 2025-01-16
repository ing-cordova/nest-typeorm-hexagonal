import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { Region } from "../../domain/region.model";
import { RegionRepository } from "../../domain/region.repository";

@Injectable()
export class FindAllRegionUseCase {
  constructor(private readonly regionRepository: RegionRepository) {}

  async execute(): Promise<Region[]> {
    return this.regionRepository.findAll();
  }
}
