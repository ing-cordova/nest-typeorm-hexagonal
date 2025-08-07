import { Command } from "commander";
import { Logger } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

const program = new Command();

const logger = new Logger("ModuleStructureGenerator");
program
    .version("1.0.0")
    .description("CLI to generate module structure")
    .arguments("<moduleName>")
    .action((moduleName) => {
        const baseDir = path.join(__dirname, "context/api", moduleName);

        const folders = [
            "application",
            "application/create-" + moduleName + "-use-case",
            "application/update-" + moduleName + "-use-case",
            "application/delete-" + moduleName + "-use-case",
            "application/find-all-" + moduleName + "-use-case",
            "application/find-one-" + moduleName + "-use-case",
            "domain",
            "infraestructure/http-api",
            "infraestructure/http-api/create-" + moduleName + "-controller",
            "infraestructure/http-api/delete-" + moduleName + "-by-id-controller",
            "infraestructure/http-api/find-all-" + moduleName + "-controller",
            "infraestructure/http-api/find-one-" + moduleName + "-by-id-controller",
            "infraestructure/http-api/update-" + moduleName + "-controller",
            "infraestructure/repositories",
        ];

        // Create folders
        folders.forEach((folder) => {
            const dir = path.join(baseDir, folder);
            fs.mkdirSync(dir, { recursive: true });
            logger.log(`Created folder: ${dir}`);
        });

        const files = [
            // Application
            {
                path: path.join(
                    baseDir,
                    "application/create-" + moduleName + "-use-case",
                    "create-" + moduleName + "-use-case.dto.ts"
                ),
                content: `export interface Create${capitalize(moduleName)}UseCaseDto {
    name: string;
    state: number;
}`,
            },
            {
                path: path.join(
                    baseDir,
                    `application/create-${moduleName}-use-case`,
                    `create-${moduleName}-use-case.ts`
                ),
                content: `import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { ${capitalize(moduleName)} } from "../../domain/${moduleName}.model";
import { Create${capitalize(moduleName)}UseCaseDto } from "./create-${moduleName}-use-case.dto";
import { ${capitalize(moduleName)}Repository } from "../../domain/${moduleName}.repository";

@Injectable()
export class Create${capitalize(moduleName)}UseCase {
    constructor(private readonly ${moduleName}Repository: ${capitalize(moduleName)}Repository) {}

    async execute(data: Create${capitalize(moduleName)}UseCaseDto): Promise<void> {
        const ${moduleName} = new ${capitalize(moduleName)}();
        ${moduleName}.name = data.name;
        ${moduleName}.state = data.state;
        await this.${moduleName}Repository.create(${moduleName});
    }
}`,
            },
            {
                path: path.join(
                    baseDir,
                    "application/update-" + moduleName + "-use-case",
                    "update-" + moduleName + "-use-case.dto.ts"
                ),
                content: `export interface Update${capitalize(moduleName)}UseCaseDto {
    id: number;
    name: string;
    state: number;
}`,
            },
            {
                path: path.join(
                    baseDir,
                    `application/update-${moduleName}-use-case`,
                    `update-${moduleName}-use-case.ts`
                ),
                content: `import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { ${capitalize(moduleName)} } from "../../domain/${moduleName}.model";
import { Update${capitalize(moduleName)}UseCaseDto } from "./update-${moduleName}-use-case.dto";
import { ${capitalize(moduleName)}Repository } from "../../domain/${moduleName}.repository";

@Injectable()
export class Update${capitalize(moduleName)}UseCase {
    constructor(private readonly ${moduleName}Repository: ${capitalize(moduleName)}Repository) {}

    async execute(data: Update${capitalize(moduleName)}UseCaseDto): Promise<void> {
        const ${moduleName} = await this.${moduleName}Repository.findOne(data.id);
        if (!${moduleName}) {
            throw new Error('${capitalize(moduleName)} not found');
        }

        ${moduleName}.name = data.name;
        ${moduleName}.state = data.state;
        await this.${moduleName}Repository.update(data.id, ${moduleName});
    }
}`,
            },
            {
                path: path.join(
                    baseDir,
                    "application/delete-" + moduleName + "-use-case",
                    "delete-" + moduleName + "-use-case.ts"
                ),
                content: `import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { ${capitalize(moduleName)}Repository } from "../../domain/${moduleName}.repository";

@Injectable()
export class Delete${capitalize(moduleName)}UseCase {
    constructor(private readonly ${moduleName}Repository: ${capitalize(moduleName)}Repository) {}

    async execute(id: number): Promise<void> {
        await this.${moduleName}Repository.delete(id);
    }
}`,
            },
            {
                path: path.join(
                    baseDir,
                    "application/find-one-" + moduleName + "-use-case",
                    "find-one-" + moduleName + "-use-case.ts"
                ),
                content: `import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { ${capitalize(moduleName)} } from "../../domain/${moduleName}.model";
import { ${capitalize(moduleName)}Repository } from "../../domain/${moduleName}.repository";

@Injectable()
export class FindOne${capitalize(moduleName)}UseCase {
    constructor(private readonly ${moduleName}Repository: ${capitalize(moduleName)}Repository) {}

    async execute(id: number): Promise<${capitalize(moduleName)} | null> {
        return this.${moduleName}Repository.findOne(id);
    }
}
`,
            },
            {
                path: path.join(
                    baseDir,
                    "application/find-all-" + moduleName + "-use-case",
                    "find-all-" + moduleName + "-use-case.ts"
                ),
                content: `import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { ${capitalize(moduleName)} } from "../../domain/${moduleName}.model";
import { ${capitalize(moduleName)}Repository } from "../../domain/${moduleName}.repository";

@Injectable()
export class FindAll${capitalize(moduleName)}UseCase {
    constructor(private readonly ${moduleName}Repository: ${capitalize(moduleName)}Repository) {}

    async execute(): Promise<${capitalize(moduleName)}[]> {
        return this.${moduleName}Repository.findAll();
    }
}`,
            },
            // Domain
            {
                path: path.join(baseDir, "domain", `${moduleName}.model.ts`),
                content: `
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity('${moduleName.toLowerCase()}')
export class ${capitalize(moduleName)} {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    state: number

    @CreateDateColumn({ nullable: true })
    @Exclude()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    @Exclude()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    @Exclude()
    deleted_at: Date;
}
`,
            },
            {
                path: path.join(baseDir, "domain", `${moduleName}.repository.ts`),
                content: `
import { ${capitalize(moduleName)} } from "./${moduleName}.model";

export abstract class ${capitalize(moduleName)}Repository {
    abstract create(data: ${capitalize(moduleName)}): Promise<${capitalize(moduleName)}>;
    abstract findAll(): Promise<${capitalize(moduleName)}[]>;
    abstract findOne(id: number): Promise<${capitalize(moduleName)} | null>;
    abstract update(id: number, data: ${capitalize(moduleName)}): Promise<${capitalize(moduleName)} | null>;
    abstract delete(id: number): Promise<void>;
}
`,
                // Infraestructure
            },
            {
                path: path.join(
                    baseDir,
                    "infraestructure/http-api/create-" + moduleName + "-controller",
                    `create-${moduleName}-http-dto.ts`
                ),
                content: `
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Create${capitalize(moduleName)}HttpDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    state: number;
}`,
            },
            {
                path: path.join(
                    baseDir,
                    "infraestructure/http-api/create-" + moduleName + "-controller",
                    `create-${moduleName}-controller.ts`
                ),
                content: `
        import { Body, ClassSerializerInterceptor, Controller, HttpException, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Create${capitalize(moduleName)}UseCase } from '../../../application/create-${moduleName}-use-case/create-${moduleName}-use-case';
import { Create${capitalize(moduleName)}HttpDto } from './create-${moduleName}-http-dto';
import { ${capitalize(moduleName)} } from '../../../domain/${moduleName}.model';

@ApiTags('auto-generated')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class Create${capitalize(moduleName)}Controller {
    constructor(private readonly create${capitalize(moduleName)}UseCase: Create${capitalize(moduleName)}UseCase) {}

    @Post('/${moduleName}')
    @ApiBody({ type: Create${capitalize(moduleName)}HttpDto })
    @ApiResponse({ status: 201, type: ${capitalize(moduleName)} })
    async execute(@Body() dto: Create${capitalize(moduleName)}HttpDto): Promise<void> {
        await this.create${capitalize(moduleName)}UseCase.execute(dto);
    }
}
`,
            },
            {
                path: path.join(
                    baseDir,
                    "infraestructure/http-api/delete-" + moduleName + "-by-id-controller",
                    `delete-${moduleName}-by-id-controller.ts`
                ),
                content: `
import { ApiTags } from '@nestjs/swagger';
import { Delete${capitalize(moduleName)}UseCase } from '../../../application/delete-${moduleName}-use-case/delete-${moduleName}-use-case';
import { Controller, Delete, Param } from '@nestjs/common';

@ApiTags('auto-generated')
@Controller()
export class Delete${capitalize(moduleName)}ByIdController {
    constructor(private readonly delete${capitalize(moduleName)}UseCase: Delete${capitalize(moduleName)}UseCase) {}

    @Delete('/${moduleName}/:id')
    async execute(@Param('id') id: number): Promise<void> {
        await this.delete${capitalize(moduleName)}UseCase.execute(id);
    }
}
`,
            },
            {
                path: path.join(
                    baseDir,
                    "infraestructure/http-api/find-all-" + moduleName + "-controller",
                    `find-all-${moduleName}-controller.ts`
                ),
                content: `
import { ApiTags } from '@nestjs/swagger';
import { FindAll${capitalize(moduleName)}UseCase } from '../../../application/find-all-${moduleName}-use-case/find-all-${moduleName}-use-case';
import { Controller, Get } from '@nestjs/common';

@ApiTags('auto-generated')
@Controller()
export class FindAll${capitalize(moduleName)}Controller {
    constructor(private readonly findAll${capitalize(moduleName)}UseCase: FindAll${capitalize(moduleName)}UseCase) {}

    @Get('/${moduleName}')
    async execute(): Promise<void> {
        await this.findAll${capitalize(moduleName)}UseCase.execute();
    }
}
`,
            },
            {
                path: path.join(
                    baseDir,
                    "infraestructure/http-api/find-one-" + moduleName + "-by-id-controller",
                    `find-one-${moduleName}-by-id-controller.ts`
                ),
                content: `
import { ApiTags } from '@nestjs/swagger';
import { FindOne${capitalize(moduleName)}UseCase } from '../../../application/find-one-${moduleName}-use-case/find-one-${moduleName}-use-case';
import { Controller, Get, Param } from '@nestjs/common';

@ApiTags('auto-generated')
@Controller()
export class FindOne${capitalize(moduleName)}ByIdController {
    constructor(private readonly findOne${capitalize(moduleName)}UseCase: FindOne${capitalize(moduleName)}UseCase) {}

    @Get('/${moduleName}/:id')
    async execute(@Param('id') id: number): Promise<void> {
        await this.findOne${capitalize(moduleName)}UseCase.execute(id);
    }
}
`,
            },
            {
                path: path.join(
                    baseDir,
                    "infraestructure/http-api/update-" + moduleName + "-controller",
                    `update-${moduleName}-http-dto.ts`
                ),
                content: `
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Update${capitalize(moduleName)}HttpDto {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNumber()
    state: number;
}
`,
            },
            {
                path: path.join(
                    baseDir,
                    "infraestructure/http-api/update-" + moduleName + "-controller",
                    `update-${moduleName}-controller.ts`
                ),
                content: `
import { Body, ClassSerializerInterceptor, Controller, HttpException, Param, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Update${capitalize(moduleName)}UseCase } from '../../../application/update-${moduleName}-use-case/update-${moduleName}-use-case';
import { Update${capitalize(moduleName)}HttpDto } from './update-${moduleName}-http-dto';
import { ${capitalize(moduleName)} } from '../../../domain/${moduleName}.model';

@ApiTags('auto-generated')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class Update${capitalize(moduleName)}Controller {
    constructor(private readonly update${capitalize(moduleName)}UseCase: Update${capitalize(moduleName)}UseCase) {}

    @Put('/${moduleName}/:id')
    @ApiBody({ type: Update${capitalize(moduleName)}HttpDto })
    @ApiResponse({ status: 200, type: ${capitalize(moduleName)} })
    async execute(@Param('id') id: number, @Body() dto: Update${capitalize(moduleName)}HttpDto): Promise<void> {
        await this.update${capitalize(moduleName)}UseCase.execute({ ...dto, id });
    }
}
`,
            },
            {
                path: path.join(
                    baseDir,
                    "infraestructure/repositories",
                    `typeorm-${moduleName}.repository.ts`
                ),
                content: `import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { ${capitalize(moduleName)} } from "../../domain/${moduleName}.model";
import { ${capitalize(moduleName)}Repository } from "../../domain/${moduleName}.repository";

@Injectable()
export class TypeOrm${capitalize(moduleName)}Repository extends ${capitalize(moduleName)}Repository {
    constructor(
        @InjectRepository(${capitalize(moduleName)})
        private readonly repository: Repository<${capitalize(moduleName)}>,
    ) {
        super();
    }

    async create(data: ${capitalize(moduleName)}): Promise<${capitalize(moduleName)}> {
        return this.repository.save(data);
    }
    async findAll(): Promise<${capitalize(moduleName)}[]> {
        return this.repository.find();
    }
    async findOne(id: number): Promise<${capitalize(moduleName)} | null> {
        return this.repository.findOne({ where: { id } });
    }
    async update(id: number, data: ${capitalize(moduleName)}): Promise<${capitalize(moduleName)} | null> {
        await this.repository.update(id, data);
        return this.repository.findOne({ where: { id } });
    }
    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}`,
            },
            {
                path: path.join(baseDir, `infraestructure`, `${moduleName}.module.ts`),
                content: `import { Module } from '@nestjs/common';
import { Create${capitalize(moduleName)}UseCase } from '../application/create-${moduleName}-use-case/create-${moduleName}-use-case';
import { Update${capitalize(moduleName)}UseCase } from '../application/update-${moduleName}-use-case/update-${moduleName}-use-case';
import { Delete${capitalize(moduleName)}UseCase } from '../application/delete-${moduleName}-use-case/delete-${moduleName}-use-case';
import { FindAll${capitalize(moduleName)}UseCase } from '../application/find-all-${moduleName}-use-case/find-all-${moduleName}-use-case';
import { FindOne${capitalize(moduleName)}UseCase } from '../application/find-one-${moduleName}-use-case/find-one-${moduleName}-use-case';
import { TypeOrm${capitalize(moduleName)}Repository } from './repositories/typeorm-${moduleName}.repository';
import { ${capitalize(moduleName)} } from '../domain/${moduleName}.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/context/services/jwt/jwt.strategy';
import { PermissionModule } from '../../permission/infraestructure/permission.module';
import { Create${capitalize(moduleName)}Controller } from './http-api/create-${moduleName}-controller/create-${moduleName}-controller';
import { Update${capitalize(moduleName)}Controller } from './http-api/update-${moduleName}-controller/update-${moduleName}-controller';
import { Delete${capitalize(moduleName)}ByIdController } from './http-api/delete-${moduleName}-by-id-controller/delete-${moduleName}-by-id-controller';
import { FindAll${capitalize(moduleName)}Controller } from './http-api/find-all-${moduleName}-controller/find-all-${moduleName}-controller';
import { FindOne${capitalize(moduleName)}ByIdController } from './http-api/find-one-${moduleName}-by-id-controller/find-one-${moduleName}-by-id-controller';
import { ${capitalize(moduleName)}Repository } from '../domain/${moduleName}.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([${capitalize(moduleName)}]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        }),
        PermissionModule
    ],
    controllers: [
        Create${capitalize(moduleName)}Controller,
        Update${capitalize(moduleName)}Controller,
        Delete${capitalize(moduleName)}ByIdController,
        FindAll${capitalize(moduleName)}Controller,
        FindOne${capitalize(moduleName)}ByIdController,
    ],
    providers: [
        Create${capitalize(moduleName)}UseCase,
        Update${capitalize(moduleName)}UseCase,
        Delete${capitalize(moduleName)}UseCase,
        FindAll${capitalize(moduleName)}UseCase,
        FindOne${capitalize(moduleName)}UseCase,
        TypeOrm${capitalize(moduleName)}Repository,
        {
            provide: ${capitalize(moduleName)}Repository,
            useClass: TypeOrm${capitalize(moduleName)}Repository,
        },
        JwtStrategy,
    ],
    exports: [
        Create${capitalize(moduleName)}UseCase,
        Update${capitalize(moduleName)}UseCase,
        Delete${capitalize(moduleName)}UseCase,
        FindAll${capitalize(moduleName)}UseCase,
        FindOne${capitalize(moduleName)}UseCase,
    ],
})
export class ${capitalize(moduleName)}Module {}`,
            },
        ];

        files.forEach((file) => {
            fs.writeFileSync(file.path, file.content);
            logger.log(`Created file: ${file.path}`);
        });

        logger.log(`Module structure for ${moduleName} created successfully at ${baseDir}`);
    });

program.parse(process.argv);

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
