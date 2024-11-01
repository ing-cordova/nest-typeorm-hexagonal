// src/cli.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { CountrySeeder } from './context/seeds/country.seeder';
import { StateSeeder } from './context/seeds/state.seeder';
import { UserTypeSeeder } from './context/seeds/user-type.seeder';
import { AuthUserSeeder } from './context/seeds/authuser.seeder';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    await runSeeders(dataSource, {
        seeds: [
            CountrySeeder,
            StateSeeder,
            UserTypeSeeder,
            AuthUserSeeder
        ],
    });

    await app.close();
}

bootstrap().catch(err => {
    console.error('Error running seeders', err);
    process.exit(1);
});
