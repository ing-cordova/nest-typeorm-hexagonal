import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { IssuerType } from "../../domain/issuer-type.model";
import { IssuerTypeRepository } from "../../domain/issuer-type.repository";

@Injectable()
export class FindOneIssuerTypeUseCase {
    constructor(private readonly issuerTypeRepository: IssuerTypeRepository) {}

    async execute(id: number): Promise<IssuerType | null> {
        return this.issuerTypeRepository.findOne(id);
    }
}
