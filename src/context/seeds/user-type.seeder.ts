import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { UserType } from "../api/userType/domain/user-type.model";

export class UserTypeSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userTypeRepository = dataSource.getRepository(UserType);

        const userTypeToInsert = [
            {
                id: '5a954780-7dcb-4c06-a005-f2013292c70b',
                name: "SuperAdministrator",
                description: "User Type in which all the features are available",
                created_at: new Date(),
            },
            {
                id: 'c591002f-7a10-4376-b2a0-3878e2fc338e',
                name: "Administrator",
                description: "User Type in which some of the most important features are available",
                created_at: new Date(),
            },
            {
                id: '3a743bd0-2318-45b0-b766-9a574d90c58e',
                name: "Teacher",
                description: "User Type in which just teachers can access the system",
                created_at: new Date(),
            },
            {
                id: '3e88fb65-40bf-470d-bb96-ab0b8e24c64f',
                name: "Student",
                description: "User Type in which just students can access the system",
                created_at: new Date(),
            },
        ]

        await userTypeRepository.insert(userTypeToInsert);
        console.log('> Seeded UserType Successfully');
    }
}