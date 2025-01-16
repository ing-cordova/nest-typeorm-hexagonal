import { PaymentMethodRepository } from "../../domain/payment-method.repository";
import { ViewAllPaymentMethodsUseCase } from "./view-all-payment-methods-use-case";

describe('ViewAllPaymentMethodsUseCase', () => {
    let useCase: ViewAllPaymentMethodsUseCase;
    let paymentMethodRepository: PaymentMethodRepository;

    beforeEach(() => {
        paymentMethodRepository = {
            findAll: jest.fn()
        } as unknown as PaymentMethodRepository;
        useCase = new ViewAllPaymentMethodsUseCase(paymentMethodRepository);
    });

    it('should return all payment methods', async () => {
        const paymentMethods = [{ id: 1, name: 'Credit Card' }, { id: 2, name: 'PayPal' }];
        (paymentMethodRepository.findAll as jest.Mock).mockResolvedValue(paymentMethods);

        const result = await useCase.execute();

        expect(result).toEqual(paymentMethods);
        expect(paymentMethodRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when repository fails', async () => {
        (paymentMethodRepository.findAll as jest.Mock).mockRejectedValue(new Error('Repository error'));

        await expect(useCase.execute()).rejects.toThrow('Repository error');
        expect(paymentMethodRepository.findAll).toHaveBeenCalledTimes(1);
    });
});