import { Injectable } from "src/context/shared/dependency-injection/injectable";
import { CountryRepository } from "../../domain/country.repository";
import { Country } from "../../domain/country.model";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

@Injectable()
export class TypeOrmCountryRepository extends CountryRepository {

    constructor(
        @InjectRepository(Country)
        private readonly repository: Repository<Country>,
    ) {
        super();
    }
    async findAll(): Promise<Country[]> {
        //1. return all countries
        // return this.repository.find();

        //2. return countries with id specified
        // return this.repository.find({ where: { id: In([66, 236]) } });

        //3. return countries with sub_region specified
        return this.repository.find({ where: { sub_region: In(["Northern America","Central America"]) } });
    }
}