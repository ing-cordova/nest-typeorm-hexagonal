import { UUID } from "crypto";

export enum UserTypeEnum {
    SUPER_ADMINISTRATOR = '5a954780-7dcb-4c06-a005-f2013292c70b',
    ADMINISTRATOR = 'c591002f-7a10-4376-b2a0-3878e2fc338e',
    TEACHER = '3a743bd0-2318-45b0-b766-9a574d90c58e',
    STUDENT = '3e88fb65-40bf-470d-bb96-ab0b8e24c64f'
}

const userTypeMap: { [key: string]: UUID } = {
    'SuperAdministrator': UserTypeEnum.SUPER_ADMINISTRATOR,
    'Administrator': UserTypeEnum.ADMINISTRATOR,
    'Teacher': UserTypeEnum.TEACHER,
    'Student': UserTypeEnum.STUDENT
};

export const userTypeReverseMap: { [key: UUID]: string } = {
    [UserTypeEnum.SUPER_ADMINISTRATOR]: 'SuperAdministrator',
    [UserTypeEnum.ADMINISTRATOR]: 'Administrator',
    [UserTypeEnum.TEACHER]: 'Teacher',
    [UserTypeEnum.STUDENT]: 'Student'
};

export function getUserTypeId(userType: string): UUID | undefined {
    return userTypeMap[userType];
}

export function isMaster(userType: string): boolean {
    const userTypeId = getUserTypeId(userType);
    return userTypeId === UserTypeEnum.SUPER_ADMINISTRATOR || userTypeId === UserTypeEnum.ADMINISTRATOR;
} 