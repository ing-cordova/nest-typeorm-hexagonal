import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { IssuerTypeRepository } from "../../domain/issuer-type.repository";

@Injectable()
export class DeleteIssuerTypeUseCase {
    constructor(private readonly issuerTypeRepository: IssuerTypeRepository) {}

    async execute(id: number): Promise<void> {
        await this.issuerTypeRepository.delete(id);
    }
}