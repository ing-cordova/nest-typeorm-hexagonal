import { Injectable } from "src/context/shared/dependency-injection/injectable";
import { CountryRepository } from "../../domain/country.repository";
import { Country } from "../../domain/country.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmCountryRepository extends CountryRepository {

    constructor(
        @InjectRepository(Country)
        private readonly repository: Repository<Country>,
    ) {
        super();
    }
    async findAll(): Promise<Country[]> {
        return this.repository.find();
    }
}