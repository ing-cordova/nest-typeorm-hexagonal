import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { AuthUser } from "../api/authUser/domain/authuser.model";
import { encryptPassword } from "../services/password-service";

export class AuthUserSeeder implements Seeder {
    async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const authUserRepository = dataSource.getRepository(AuthUser);

        const authUserToInsert = [{
            user_type_id: 1,
            first_name: "Super Administrator",
            last_name: "BELS GI",
            email: "superadmin@belsgi.com",
            email_verified_at: new Date(),
            username: "superadmin",
            country_id: 66,
            state_id: 1109,
            address: "Casa Matriz, Fte. a Departamental de Chalatenango",
            password: encryptPassword("$Admin123$"),
            accepted_terms: true,
            created_at: new Date(),
        }]

        await authUserRepository.insert(authUserToInsert);
        console.log('> Seeded AuthUser Successfully');
    }
}