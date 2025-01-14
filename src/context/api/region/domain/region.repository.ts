
import { Region } from "./region.model";

export abstract class RegionRepository {
    abstract findAll(): Promise<Region[]>;
}
