import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as fs from "fs";
import * as path from "path";
import { Permission } from "../api/permission/domain/permission.model";
import { PermissionUserType } from "../api/permissionUserType/domain/permission-user-type.model";

export class PermissionSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const permissionRepository = dataSource.getRepository(Permission);
        const permissionUserTypeRepository = dataSource.getRepository(PermissionUserType);

        const filePath = path.join(process.cwd(), "src/context/docs/permissions.json");
        const fileData = await fs.promises.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(fileData);

        const permissionsToInsert = jsonData.map((permission: any) => ({
            id: permission.id,
            can: permission.name,
            created_at: new Date()
        }));

        // Guardamos primero los permisos
        await permissionRepository.insert(permissionsToInsert);
        console.log("> Seeded Permissions Successfully");

        // Ahora insertamos las relaciones permission_id y user_type_id en PermissionUserType
        const permissionUserTypesToInsert = [];
        jsonData.forEach((permission: any) => {
            permission.user_types.forEach((userTypeId: number) => {
                permissionUserTypesToInsert.push({
                    permission_id: permission.id,
                    user_type_id: userTypeId,
                    created_at: new Date()
                });
            });
        });

        // Guardamos las relaciones en PermissionUserType
        await permissionUserTypeRepository.insert(permissionUserTypesToInsert);
        console.log("> Seeded PermissionUserTypes Successfully");
    }
}