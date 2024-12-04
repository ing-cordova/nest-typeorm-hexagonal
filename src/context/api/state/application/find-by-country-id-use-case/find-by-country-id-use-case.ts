import { Injectable } from "src/context/shared/dependency-injection/injectable";
import { StateRepository } from "../../domain/state.repository";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class FindByCountryIdUseCase {
    constructor(private readonly stateRepository: StateRepository) { }

    async execute(countryId: number) {
        try {
            return this.stateRepository.findByCountryId(countryId);
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}