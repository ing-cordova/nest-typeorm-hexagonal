import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Permission } from "../api/permission/domain/permission.model";
import { PermissionUserType } from "../api/permissionUserType/domain/permission-user-type.model";
import { PermissionsMainData } from "../api/permission/domain/permission-data";

export class PermissionSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const permissionRepository = dataSource.getRepository(Permission);
        const permissionUserTypeRepository = dataSource.getRepository(PermissionUserType);

        const permissionsToInsert = PermissionsMainData.map((permission: any) => ({
            id: permission.id,
            can: permission.can,
            description: permission.description,
            created_at: new Date()
        }));

        // Guardamos primero los permisos
        await permissionRepository.insert(permissionsToInsert);
        console.log("> Seeded Permissions Successfully");

        // Ahora insertamos las relaciones permission_id y user_type_id en PermissionUserType
        const permissionUserTypesToInsert = [];
        PermissionsMainData.forEach((permission: any) => {
            permission.user_types.forEach((userTypeId: string) => {
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