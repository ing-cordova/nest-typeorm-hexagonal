import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthUserModule } from './context/api/authUser/infraestructure/authuser.module';
import { UserTypeModule } from './context/api/userType/infraestructure/user-type.module';
import { CountryModule } from './context/api/country/infraestructure/country.module';
import { StateModule } from './context/api/State/infraestructure/state.module';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { CountrySeeder } from './context/seeds/country.seeder';
import { StateSeeder } from './context/seeds/state.seeder';
import { AuthUserSeeder } from './context/seeds/authuser.seeder';
import { UserTypeSeeder } from './context/seeds/user-type.seeder';

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
        dropSchema: false,  // Turn off in production mode
      }),
    }),
    
    AuthUserModule,
    UserTypeModule,
    CountryModule,
    StateModule
  ],
})
export class AppModule { }
