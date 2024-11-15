import { PermissionEnum } from "./permission.enum";

export const PermissionsMainData = [
    {
        id: 1,
        can: PermissionEnum.ADD_NEW_USER,
        description: "Permission to add new user into the system",
        user_types: [1, 2]
    },
    {
        id: 2,
        can: PermissionEnum.CHANGE_TEMPORAL_PASSWORD,
        description: "Permission to change the temporal password",
        user_types: [1, 2, 3, 4]
    },
];