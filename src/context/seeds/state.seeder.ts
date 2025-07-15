import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { State } from "../api/state/domain/state.model";
import * as fs from "fs";
import * as path from "path";
import { Logger } from "@nestjs/common";

export class StateSeeder implements Seeder {
    private readonly logger = new Logger(StateSeeder.name);
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const stateRepository = dataSource.getRepository(State);

        const filePath = path.join(process.cwd(), "src/context/docs/states-v1.json")
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(fileData);

        const statesToInsert = jsonData.map((state: any) => ({
            name: state.name.replace(' Department', ''),
            country_id: state.country_id,
            state_code: state.state_code,
            created_at: new Date(),
        }));

        await stateRepository.insert(statesToInsert);
        this.logger.log('[🌱] Seeded State Successfully');
    }
}