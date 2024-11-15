import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { encryptPassword } from "../services/password-service";
import { UserProfile } from "../api/userProfile/domain/userprofile.model";

export class UserProfileSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userProfileRepository = dataSource.getRepository(UserProfile);

        const userProfileToInsert = [
            {
                user_type_id: 1,
                first_name: "Super Administrator",
                last_name: "Company",
                email: "superadmin@test.com",
                email_verified_at: new Date(),
                username: "superadmin",
                country_id: 66,
                state_id: 1109,
                address: "Casa Matriz, Fte. a Departamental de Chalatenango",
                password: encryptPassword("$Admin123$"),
                is_temporal_password: false,
                accepted_terms: true,
                created_at: new Date(),
            },
        ];

        await userProfileRepository.insert(userProfileToInsert);
        console.log('> Seeded UserProfile Successfully');
    }
}