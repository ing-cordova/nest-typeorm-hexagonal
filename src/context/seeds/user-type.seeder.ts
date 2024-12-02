import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { UserType } from "../api/userType/domain/user-type.model";

export class UserTypeSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userTypeRepository = dataSource.getRepository(UserType);

        const userTypeToInsert = [
            {
                name: "SuperAdmin",
                description: "Super usuario con acceso a todas las funcionalidades",
                created_at: new Date(),
            },
            {
                name: "Administrador/a",
                description: "Tipo de usuario especializado en la administración de la plataforma",
                created_at: new Date(),
            },
            {
                name: "Doctor/a",
                description: "Tipo de usuario especializado en la consulta de pacientes",
                created_at: new Date(),
            },
            {
                name: "Enfermero/a",
                description: "Tipo de usuario especializado en la atención de pacientes",
                created_at: new Date(),
            },
            {
                name: "Cajero/a",
                description: "Tipo de usuario especializado en la facturación de pacientes",
                created_at: new Date(),
            }
        ]

        await userTypeRepository.insert(userTypeToInsert);
        console.log('> Seeded UserType Successfully');
    }
}