import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { AuthUser } from "../api/authUser/domain/authuser.model";
import { encryptPassword } from "../services/password-service";
import { UserType } from "../api/userType/domain/user-type.model";

export class UserTypeSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userTypeRepository = dataSource.getRepository(UserType);

        const userTypeToInsert = [
            {
                name: "SuperAdmin",
                description: "User Type in which all the features are available",
                created_at: new Date(),
            },
            {
                name: "Administrator",
                description: "User Type in which some of the most important features are available",
                created_at: new Date(),
            },
            {
                name: "Student",
                description: "User Type in which just students can access the system",
                created_at: new Date(),
            },
            {
                name: "Teacher",
                description: "User Type in which just teachers can access the system",
                created_at: new Date(),
            }
        ]

        await userTypeRepository.insert(userTypeToInsert);
        console.log('> Seeded UserType Successfully');
    }
}