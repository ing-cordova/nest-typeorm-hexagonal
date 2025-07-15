import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { IssuerType } from "../api/issuerType/domain/issuer-type.model";
import { IssuerTypeEnum } from "../api/issuerType/domain/issuer-type.enum";
import { Logger } from "@nestjs/common";

export class IssuerTypeSeeder implements Seeder {
    private readonly logger = new Logger(IssuerTypeSeeder.name);
    async run(datasource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const issuerTypeRepository = datasource.getRepository(IssuerType);

        const issuerTypeToInsert = [
            {
               name: IssuerTypeEnum.NA,
               description: 'Not Applicable'
            },
            {
                name: IssuerTypeEnum.WEB,
                description: 'Issuer Type when the transaction is made through a web browser'
            }, 
            {
                name: IssuerTypeEnum.MOBILE,
                description: 'Issuer Type when the transaction is made through a mobile device'
            }, 
            {
                name: IssuerTypeEnum.POS,
                description: 'Issuer Type when the transaction is made through a Point of Sale'
            },
            {
                name: IssuerTypeEnum.IN_PLACEMENT,
                description: 'Issuer Type when the transaction is made in a physical location'
            }
        ];

        await issuerTypeRepository.insert(issuerTypeToInsert);
        this.logger.log('[🌱] Seeded IssuerType Successfully');
    }

}