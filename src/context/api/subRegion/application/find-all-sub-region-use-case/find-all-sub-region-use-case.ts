import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { SubRegion } from "../../domain/sub-region.model";
import { SubRegionRepository } from "../../domain/sub-region.repository";

@Injectable()
export class FindAllSubRegionUseCase {
    constructor(private readonly subRegionRepository: SubRegionRepository) {}

    async execute(): Promise<SubRegion[]> {
        return this.subRegionRepository.findAll();
    }
}