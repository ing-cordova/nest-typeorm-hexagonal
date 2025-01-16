import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { PaymentMethod } from "../api/paymentMethod/domain/payment-method.model";
import { PaymentMethodEnum } from "../api/paymentMethod/domain/payment-method.enum";

export class PaymentMethodSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const paymentMethodRepository = dataSource.getRepository(PaymentMethod);

        const paymentMethodToInsert = [
            {
                name: PaymentMethodEnum.CASH,
                description: "Method used to pay with cash",
            },
            {
                name: PaymentMethodEnum.DEBIT_CARD,
                description: "Method used to pay with debit card",
            },
            {
                name: PaymentMethodEnum.CREDIT_CARD,
                description: "Method used to pay with credit card",
            },
            {
                name: PaymentMethodEnum.SCHOLARSHIP,
                description: "Single benefit granted to a student",
            }
        ]

        await paymentMethodRepository.insert(paymentMethodToInsert);
        console.log('> Seeded Payment Method Successfully');
    }
}