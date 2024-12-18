import { PaymentMethod } from "./payment-method.model";

describe('PaymentMethod Model', () => {
    it('should create a new PaymentMethod instance', () => {
        const paymentMethod = new PaymentMethod();
        expect(paymentMethod).toBeInstanceOf(PaymentMethod);
    });

    it('should have the correct properties', () => {
        const paymentMethod = new PaymentMethod();
        paymentMethod.id = 1;
        paymentMethod.name = 'Credit Card';
        paymentMethod.description = 'Payment via credit card';
        paymentMethod.created_at = new Date();
        paymentMethod.updated_at = new Date();
        paymentMethod.deleted_at = new Date();

        expect(paymentMethod.id).toBe(1);
        expect(paymentMethod.name).toBe('Credit Card');
        expect(paymentMethod.description).toBe('Payment via credit card');
        expect(paymentMethod.created_at).toBeInstanceOf(Date);
        expect(paymentMethod.updated_at).toBeInstanceOf(Date);
        expect(paymentMethod.deleted_at).toBeInstanceOf(Date);
    });

    it('should set properties correctly', () => {
        const paymentMethod = new PaymentMethod();
        paymentMethod.name = 'Credit Card';
        paymentMethod.description = 'Payment via credit card';

        expect(paymentMethod.name).toBe('Credit Card');
        expect(paymentMethod.description).toBe('Payment via credit card');
    });
});
