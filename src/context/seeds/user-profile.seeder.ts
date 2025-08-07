import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { encryptPassword } from "../services/password-service";
import { UserProfile } from "../api/userProfile/domain/userprofile.model";
import { UserType } from "../api/userType/domain/user-type.model";
import { UUID } from "crypto";
import { Logger } from "@nestjs/common";

export class UserProfileSeeder implements Seeder {
    private readonly logger = new Logger(UserProfileSeeder.name);
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userProfileRepository = dataSource.getRepository(UserProfile);

        const userProfileToInsert = [
            {
                user_type_id: '5a954780-7dcb-4c06-a005-f2013292c70b' as UUID,
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
        this.logger.log('[🌱] Seeded UserProfile Successfully');
    }
}