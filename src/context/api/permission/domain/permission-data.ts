import { UserTypeEnum } from "../../userType/domain/user-type.enum";
import { PermissionEnum } from "./permission.enum";

const allUserTypes = Object.values(UserTypeEnum).filter(value => typeof value === 'number') as UserTypeEnum[];

function expandUserTypes(userTypes: (UserTypeEnum | '*')[]): UserTypeEnum[] {
    if (userTypes.includes('*')) {
        return allUserTypes;
    }
    return userTypes as UserTypeEnum[];
}

export const PermissionsMainData = [
    {
        id: 1,
        can: PermissionEnum.LOGIN,
        description: "Permission to login into the system",
        user_types: expandUserTypes(['*'])
    },
    {
        id: 2,
        can: PermissionEnum.GENERATE_PROFILE,
        description: "Permission to add new user into the system",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 3,
        can: PermissionEnum.CHANGE_TEMPORAL_PASSWORD,
        description: "Permission to change the temporal password",
        user_types: expandUserTypes(['*'])
    },
    {
        id: 4,
        can: PermissionEnum.CREATE_PROFILE,
        description: "Permission to create a new user",
        user_types: expandUserTypes([UserTypeEnum.STUDENT])
    },
    {
        id: 5,
        can: PermissionEnum.UPDATE_PROFILE,
        description: "Permission to update the user information",
        user_types: expandUserTypes(['*'])
    },
    {
        id: 6,
        can: PermissionEnum.DELETE_PROFILE,
        description: "Permission to delete an user of the system",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 7,
        can: PermissionEnum.VIEW_PROFILE,
        description: "Permission to view the user information",
        user_types: expandUserTypes(['*'])
    },
    {
        id: 8,
        can: PermissionEnum.VIEW_ALL_PROFILE,
        description: "Permission to view all the users information",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 9,
        can: PermissionEnum.VIEW_ALL_MESSAGES,
        description: "Permission to view all the messages",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 10,
        can: PermissionEnum.VIEW_ALL_PAYMENT_METHODS,
        description: "Permission to view all the payment methods",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 11,
        can: PermissionEnum.CREATE_PAYMENT_METHOD,
        description: "Permission to create a new payment method",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR])
    }
];