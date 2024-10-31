import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { State } from "../api/State/domain/state.model";

export class StateSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const stateRepository = dataSource.getRepository(State);

        await stateRepository.insert([
            {
                name: 'San Salvador',
                country: { id: 1 },
                created_at: new Date(),
            },
            {
                name: 'San Francisco',
                country: { id: 2 },
                created_at: new Date(),
            },
        ]);
    }
}