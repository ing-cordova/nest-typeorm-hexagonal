
import { PaymentMethod } from "./payment-method.model";

export abstract class PaymentMethodRepository {
    abstract create(data: PaymentMethod): Promise<void>;
    abstract findAll(): Promise<PaymentMethod[]>;
    abstract findOne(id: number): Promise<PaymentMethod | null>;
    abstract update(id: number, data: PaymentMethod): Promise<PaymentMethod | null>;
    abstract delete(id: number): Promise<void>;
}
