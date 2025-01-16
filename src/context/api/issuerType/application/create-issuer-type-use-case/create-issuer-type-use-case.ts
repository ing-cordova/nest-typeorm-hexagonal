import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { IssuerType } from "../../domain/issuer-type.model";
import { CreateIssuerTypeUseCaseDto } from "./create-issuer-type-use-case.dto";
import { IssuerTypeRepository } from "../../domain/issuer-type.repository";

@Injectable()
export class CreateIssuerTypeUseCase {
    constructor(private readonly issuerTypeRepository: IssuerTypeRepository) {}

    async execute(data: CreateIssuerTypeUseCaseDto): Promise<void> {
        const issuerType = new IssuerType();
        issuerType.name = data.name;
        issuerType.description = data.description;
        await this.issuerTypeRepository.create(issuerType);
    }
}