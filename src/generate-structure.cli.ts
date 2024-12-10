import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";

const program = new Command();

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
      "infraestructure/repositories",
    ];

    // Create folders
    folders.forEach((folder) => {
      const dir = path.join(baseDir, folder);
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created folder: ${dir}`);
    });

    const files = [
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
      },
      {
        path: path.join(
          baseDir,
          "infraestructure/http-api",
          `${moduleName}.controller.ts`
        ),
        content: `import { Controller } from '@nestjs/common';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';

@Controller()   
export class ${capitalize(moduleName)}Controller {
    constructor(private readonly ${moduleName}Service: ${capitalize(moduleName)}Service) {}
}`,
      },
      {
        path: path.join(
          baseDir,
          "infraestructure/repositories",
          `${moduleName}.repository.ts`
        ),
        content: `export class ${capitalize(moduleName)}Repository {}`,
      },
      {
        path: path.join(baseDir, `infraestructure`, `${moduleName}.module.ts`),
        content: `import { Module } from '@nestjs/common';
import { ${capitalize(moduleName)}Controller } from './http-api/${moduleName}.controller';
import { Create${capitalize(moduleName)}UseCase } from '../application/create-${moduleName}-use-case/create-${moduleName}-use-case';
import { ${capitalize(moduleName)}Repository } from '../repositories/${moduleName}.repository';

@Module({
    controllers: [${capitalize(moduleName)}Controller],
    providers: [Create${capitalize(moduleName)}UseCase, ${capitalize(moduleName)}Repository],
    exports: [Create${capitalize(moduleName)}UseCase],
})
export class ${capitalize(moduleName)}Module {}`,
      },
    ];

    files.forEach((file) => {
      fs.writeFileSync(file.path, file.content);
      console.log(`Created file: ${file.path}`);
    });

    console.log(`Module ${moduleName} created successfully!`);
  });

program.parse(process.argv);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
