import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { IssuerType } from "../../domain/issuer-type.model";
import { IssuerTypeRepository } from "../../domain/issuer-type.repository";

@Injectable()
export class TypeOrmIssuerTypeRepository extends IssuerTypeRepository {
  constructor(
    @InjectRepository(IssuerType)
    private readonly repository: Repository<IssuerType>
  ) {
    super();
  }

  async create(data: IssuerType): Promise<IssuerType> {
    return this.repository.save(data);
  }
  async findAll(): Promise<IssuerType[]> {
    return this.repository.find({ order: { id: "ASC" } });
  }
  async findOne(id: number): Promise<IssuerType | null> {
    return this.repository.findOne({ where: { id } });
  }
  async update(id: number, data: IssuerType): Promise<IssuerType | null> {
    await this.repository.update(id, { ...data, updated_at: new Date() });
    return this.repository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
