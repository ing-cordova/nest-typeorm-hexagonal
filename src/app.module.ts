import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthUserModule } from './context/api/authUser/infraestructure/authuser.module';
import { UserTypeModule } from './context/api/userType/infraestructure/user-type.module';
import { CountryModule } from './context/api/country/infraestructure/country.module';
import { CityModule } from './context/api/City/infraestructure/city.module';

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
    
    AuthUserModule,
    UserTypeModule,
    CountryModule,
    CityModule
  ],
})
export class AppModule {}
