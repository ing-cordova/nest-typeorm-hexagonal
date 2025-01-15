
import { SubRegion } from "./sub-region.model";

export abstract class SubRegionRepository {
    abstract findAll(): Promise<SubRegion[]>;
    abstract findByRegionId(regionId: number): Promise<SubRegion[]>;
}
