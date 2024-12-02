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
                first_name: "Andres",
                second_name: "Eduardo",
                last_name: "Cordova",
                second_last_name: "Orellana",
                phone_number: "79677324",
                email: "andrescordovaoficial@gmail.com",
                email_verified_at: new Date(),
                username: "acordova",
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