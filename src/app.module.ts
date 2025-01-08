import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserTypeModule } from './context/api/userType/infraestructure/user-type.module';
import { CountryModule } from './context/api/country/infraestructure/country.module';
import { StateModule } from './context/api/state/infraestructure/state.module';
import { PermissionModule } from './context/api/permission/infraestructure/permission.module';
import { PermissionUserTypeModule } from './context/api/permissionUserType/infraestructure/permission-user-type.module';
import { RefreshTokenModule } from './context/api/refreshToken/infraestructure/refreshtoken.module';
import { UserProfileModule } from './context/api/userProfile/infraestructure/userprofile.module';
import { CategoryModule } from './context/api/category/infraestructure/category.module';
import { SubCategoryModule } from './context/api/subCategory/infraestructure/subcategory.module';
import { MessagesModule } from './context/api/messages/infraestructure/messages.module';
import { PaymentMethodModule } from './context/api/paymentMethod/infraestructure/payment-method.module';
import { IssuerTypeModule } from './context/api/issuerType/infraestructure/issuer-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as any, // supported: https://typeorm.io/data-source-options
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,  // Turn off in production mode
        dropSchema: false,  // Turn off in production mode
        migrationsRun: false,  // Turn off in production mode
      }),
    }),
    
    //modules here
    UserProfileModule,
    RefreshTokenModule,
    UserTypeModule,
    CountryModule,
    StateModule,
    PermissionModule,
    PermissionUserTypeModule,
    CategoryModule,
    SubCategoryModule,
    MessagesModule,
    PaymentMethodModule,
    IssuerTypeModule
  ],
})
export class AppModule { }
