import { UserTypeEnum } from "../../userType/domain/user-type.enum";
import { PermissionEnum } from "./permission.enum";

const allUserTypes = Object.values(UserTypeEnum).filter(value => typeof value === 'string') as UserTypeEnum[];

function expandUserTypes(userTypes: (UserTypeEnum | '*')[]): UserTypeEnum[] {
    if (userTypes.includes('*')) {
        return allUserTypes;
    }
    return userTypes as UserTypeEnum[];
}

export const PermissionsMainData = [
    {
        id: '207cc4b4-f92f-4cdc-8a78-198c429924be',
        can: PermissionEnum.LOGIN,
        description: "Permission to login into the system",
        user_types: expandUserTypes(['*'])
    },
    {
        id: 'c19951eb-4d9c-403d-b2cf-a57bed9c4183',
        can: PermissionEnum.GENERATE_PROFILE,
        description: "Permission to add new user into the system",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 'f79d09bd-35d2-4b57-aca2-f40f64307824',
        can: PermissionEnum.CHANGE_TEMPORAL_PASSWORD,
        description: "Permission to change the temporal password",
        user_types: expandUserTypes(['*'])
    },
    {
        id: 'a7d80826-a326-4a58-930e-8ae284bea7f6',
        can: PermissionEnum.CREATE_PROFILE,
        description: "Permission to create a new user",
        user_types: expandUserTypes([UserTypeEnum.STUDENT])
    },
    {
        id: '600cc3ce-107b-41d1-a317-e724f564e1d5',
        can: PermissionEnum.UPDATE_PROFILE,
        description: "Permission to update the user information",
        user_types: expandUserTypes(['*'])
    },
    {
        id: 'c18a842c-c78d-4d2e-92a6-e20f3909f2a7',
        can: PermissionEnum.DELETE_PROFILE,
        description: "Permission to delete an user of the system",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 'e4ff1bb3-e251-42d8-aa63-070bf8eefd9e',
        can: PermissionEnum.VIEW_PROFILE,
        description: "Permission to view the user information",
        user_types: expandUserTypes(['*'])
    },
    {
        id: '90314c41-3a83-43b7-b24a-c685008b5743',
        can: PermissionEnum.VIEW_ALL_PROFILE,
        description: "Permission to view all the users information",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 'e60a4eed-3d8b-4d2b-a6b4-35ef4fd79a48',
        can: PermissionEnum.VIEW_ALL_MESSAGES,
        description: "Permission to view all the messages",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: 'bacd730e-f3b4-4b4b-883a-3675875ea59e',
        can: PermissionEnum.VIEW_ALL_PAYMENT_METHODS,
        description: "Permission to view all the payment methods",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR, UserTypeEnum.ADMINISTRATOR])
    },
    {
        id: '1a1576ae-d043-4038-88d0-1b0bb72f119b',
        can: PermissionEnum.CREATE_PAYMENT_METHOD,
        description: "Permission to create a new payment method",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR])
    },
    {
        id: '77d5f5c9-6dc5-4f03-b64a-1f3fe995abf6',
        can: PermissionEnum.CREATE_NEW_ISSUER_TYPE,
        description: "Permission to create a new issuer type",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR])
    },
    {
        id: 'ed577d99-3310-4c9b-8499-0888e04780d1',
        can: PermissionEnum.VIEW_ALL_ISSUER_TYPES,
        description: "Permission to view all the issuer types",
        user_types: expandUserTypes(['*'])
    },
    {
        id: '0d91d14b-5543-4a75-8abd-a3c2fab253fe',
        can: PermissionEnum.VIEW_ISSUER_TYPE_BY_ID,
        description: "Permission to view an issuer type by id",
        user_types: expandUserTypes(['*'])
    },
    {
        id: '39eea33a-4911-4850-aa8e-f8ff9599516f',
        can: PermissionEnum.UPDATE_ISSUER_TYPE,
        description: "Permission to update an issuer type",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR])
    }, 
    {
        id: '13c9b526-0f78-46b6-be30-4729f2f10ccb',
        can: PermissionEnum.DELETE_ISSUER_TYPE,
        description: "Permission to delete an issuer type",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR])
    },
    {
        id: 'd6e08e52-4497-4daa-a827-614f4510fd93',
        can: PermissionEnum.VIEW_ALL_REGIONS,
        description: "Permission to view all the regions available in the system",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR])
    },
    {
        id: 'd0f805ff-fa0c-4b92-b2a7-f342bad4c5e8',
        can: PermissionEnum.VIEW_ALL_SUB_REGIONS,
        description: "Permission to view all the sub regions available in the system",
        user_types: expandUserTypes([UserTypeEnum.SUPER_ADMINISTRATOR])
    }
];