import { Injectable } from "src/context/shared/dependency-injection/injectable";
import { StateRepository } from "../../domain/state.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { State } from "../../domain/state.model";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmStateRepository extends StateRepository {
    constructor(
        @InjectRepository(State)
        private readonly repository: Repository<State>,
    ) {
        super();
    }

    async findByCountryId(countryId: number): Promise<State[]> {
        return this.repository.find({ where: { country_id: countryId } });
    }
}