import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { UpdateIssuerTypeUseCaseDto } from "./update-issuer-type-use-case.dto";
import { IssuerTypeRepository } from "../../domain/issuer-type.repository";

@Injectable()
export class UpdateIssuerTypeUseCase {
  constructor(private readonly issuerTypeRepository: IssuerTypeRepository) {}

  async execute(data: UpdateIssuerTypeUseCaseDto): Promise<void> {
    const issuer_type = await this.issuerTypeRepository.findOne(data.id);
    if (!issuer_type) {
      throw new Error("Issuer Type not found");
    }

    issuer_type.name = data.name ?? issuer_type.name;
    issuer_type.description = data.description ?? issuer_type.description;
    await this.issuerTypeRepository.update(data.id, issuer_type);
  }
}
