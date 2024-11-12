import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserTypeModule } from './context/api/userType/infraestructure/user-type.module';
import { CountryModule } from './context/api/country/infraestructure/country.module';
import { StateModule } from './context/api/State/infraestructure/state.module';
import { PermissionModule } from './context/api/permission/infraestructure/permission.module';
import { PermissionUserTypeModule } from './context/api/permissionUserType/infraestructure/permission-user-type.module';
import { RefreshTokenModule } from './context/api/refreshToken/infraestructure/refreshtoken.module';
import { UserProfileModule } from './context/api/userProfile/infraestructure/authuser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,  // Turn off in production mode
        dropSchema: true,  // Turn off in production mode
      }),
    }),
    
    UserProfileModule,
    RefreshTokenModule,
    UserTypeModule,
    CountryModule,
    StateModule,
    PermissionModule,
    PermissionUserTypeModule
  ],
})
export class AppModule { }
