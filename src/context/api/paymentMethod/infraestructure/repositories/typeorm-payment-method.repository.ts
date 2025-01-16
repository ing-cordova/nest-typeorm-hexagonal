import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { PaymentMethodRepository } from "../../domain/payment-method.repository";
import { PaymentMethod } from "../../domain/payment-method.model";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmPaymentMethodRepository extends PaymentMethodRepository {
    constructor(
        @InjectRepository(PaymentMethod)
        private readonly repository: Repository<PaymentMethod>,
    ) { 
        super();
    }

    async create(paymentMethod: PaymentMethod): Promise<void> {
        await this.repository.save(paymentMethod);
    }

    async findAll(): Promise<PaymentMethod[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<PaymentMethod | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async update(id: number, paymentMethod: PaymentMethod): Promise<PaymentMethod | null> {
        await this.repository.update(id, paymentMethod);
        return await this.repository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}