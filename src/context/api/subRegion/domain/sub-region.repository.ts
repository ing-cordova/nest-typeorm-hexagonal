
import { SubRegion } from "./sub-region.model";

export abstract class SubRegionRepository {
    abstract findAll(filter: Partial<SubRegion>): Promise<SubRegion[]>;
}
