import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { AuthUser } from "../api/authUser/domain/authuser.model";
import { encryptPassword } from "../services/password-service";

export class AuthUserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const authUserRepository = dataSource.getRepository(AuthUser);

        const authUserToInsert = [
            {
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
                is_temporal_password: false,
                accepted_terms: true,
                created_at: new Date(),
            },
            {
                user_type_id: 2,
                first_name: "Administrator",
                last_name: "BELS GI",
                email: "admin@belsgi.com",
                email_verified_at: new Date(),
                username: "admin",
                country_id: 66,
                state_id: 1109,
                address: "Casa Matriz, Fte. a Departamental de Chalatenango",
                password: encryptPassword("$Admin123$"),
                is_temporal_password: false,
                accepted_terms: true,
                created_at: new Date(),
            },
            {
                user_type_id: 3,
                first_name: "John",
                last_name: "Doe",
                email: "john@student.com",
                email_verified_at: new Date(),
                username: "johndoe",
                country_id: 11,
                state_id: 201,
                address: "Calle Falsa 123, Buenos Aires, CABA",
                password: encryptPassword("$John123$"),
                is_temporal_password: false,
                accepted_terms: true,
                created_at: new Date(),
            },
            {
                user_type_id: 4,
                first_name: "Maria",
                last_name: "Lopez",
                email: "maria.lopez@teacher.com",
                email_verified_at: new Date(),
                username: "marialopez",
                country_id: 39,
                state_id: 638,
                address: "Avenida Siempre Viva 456, Rosario, Santa Fe",
                password: encryptPassword("$Maria123$"),
                is_temporal_password: false,
                accepted_terms: true,
                created_at: new Date(),
            }
            
        ];

        await authUserRepository.insert(authUserToInsert);
        console.log('> Seeded AuthUser Successfully');
    }
}