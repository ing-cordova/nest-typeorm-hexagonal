import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
const requireContext = require('require-context');

const modulesContext = requireContext(join(__dirname, 'context/api'), true, /\.module\.ts$/);
const modules = modulesContext.keys().map((key) => modulesContext(key).default);

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
    
    ...modules
  ],
})
export class AppModule { }
