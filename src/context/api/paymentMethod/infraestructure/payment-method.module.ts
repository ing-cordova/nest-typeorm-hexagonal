import { Module } from '@nestjs/common';
import { PaymentMethod } from '../domain/payment-method.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PermissionModule } from '../../permission/infraestructure/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewAllPaymentMethodsController } from './http-api/view-all-payment-methods-controller/view-all-payment-methods.controller';
import { ViewAllPaymentMethodsUseCase } from '../application/view-all-payment-methods-use-case/view-all-payment-methods-use-case';
import { TypeOrmPaymentMethodRepository } from './repositories/typeorm-payment-method.repository';
import { PaymentMethodRepository } from '../domain/payment-method.repository';
import { JwtStrategy } from 'src/context/services/jwt/jwt.strategy';

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentMethod]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        }),
        PermissionModule
    ],
    controllers: [ViewAllPaymentMethodsController],
    providers: [
        TypeOrmPaymentMethodRepository,
        {
            provide: PaymentMethodRepository,
            useClass: TypeOrmPaymentMethodRepository,
        },
        JwtStrategy,
        ViewAllPaymentMethodsUseCase,
    ],
    exports: [ViewAllPaymentMethodsUseCase],
})
export class PaymentMethodModule { }