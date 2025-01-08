import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { IssuerType } from "../../domain/issuer-type.model";
import { IssuerTypeRepository } from "../../domain/issuer-type.repository";

@Injectable()
export class FindAllIssuerTypeUseCase {
    constructor(private readonly issuerTypeRepository: IssuerTypeRepository) {}

    async execute(): Promise<IssuerType[]> {
        return this.issuerTypeRepository.findAll();
    }
}