import { Injectable } from "src/context/shared/dependency-injection/injectable";
import { CountryRepository } from "../../domain/country.repository";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class GetCountriesUseCase {
    constructor(private readonly countryRepository: CountryRepository) { }

    async execute() {
        try {
            return this.countryRepository.findAll();
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}