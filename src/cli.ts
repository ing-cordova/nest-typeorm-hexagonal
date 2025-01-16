import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { CountrySeeder } from './context/seeds/country.seeder';
import { StateSeeder } from './context/seeds/state.seeder';
import { UserTypeSeeder } from './context/seeds/user-type.seeder';
import { PermissionSeeder } from './context/seeds/permission.seeder';
import { UserProfileSeeder } from './context/seeds/user-profile.seeder';
import { CategorySeeder } from './context/seeds/category.seeder';
import { SubCategorySeeder } from './context/seeds/subcategory.seeder';
import { PaymentMethodSeeder } from './context/seeds/payment-method.seeder';
import { IssuerTypeSeeder } from './context/seeds/issuer-type.seeder';
import { RegionSeeder } from './context/seeds/region.seeder';
import { SubRegionSeeder } from './context/seeds/sub_region.seeder';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    await runSeeders(dataSource, {
        seeds: [
            RegionSeeder,
            SubRegionSeeder,
            CountrySeeder,
            StateSeeder,
            UserTypeSeeder,
            UserProfileSeeder,
            PermissionSeeder,
            CategorySeeder,
            SubCategorySeeder,
            PaymentMethodSeeder,
            IssuerTypeSeeder,
        ],
    });

    await app.close();
}

bootstrap().catch(err => {
    console.error('Error running seeders', err);
    process.exit(1);
});
