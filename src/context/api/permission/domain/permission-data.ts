import { UserTypeEnum } from "../../userType/domain/user-type.enum";
import { PermissionEnum } from "./permission.enum";

export const PermissionsMainData = [
    {
        id: 1,
        can: PermissionEnum.GENERATE_PROFILE,
        description: "Permission to add new user into the system",
        user_types: [UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR]
    },
    {
        id: 2,
        can: PermissionEnum.CHANGE_TEMPORAL_PASSWORD,
        description: "Permission to change the temporal password",
        user_types: [UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR, UserTypeEnum.DOCTOR, UserTypeEnum.ENFEREMERO, UserTypeEnum.CAJERO]
    },
];