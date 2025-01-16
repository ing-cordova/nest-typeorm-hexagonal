import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { PaymentMethodRepository } from "../../domain/payment-method.repository";

@Injectable()
export class ViewAllPaymentMethodsUseCase {
    constructor(private readonly paymentMethodRepository: PaymentMethodRepository) { }

    async execute() {
        return await this.paymentMethodRepository.findAll();
    }
}