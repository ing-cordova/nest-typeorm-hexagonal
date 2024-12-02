export enum UserTypeEnum {
    SUPER_ADMINISTRATOR = 1,
    ADMINISTRATOR = 2,
    TEACHER = 3,
    STUDENT = 4
}

const userTypeMap: { [key: string]: number } = {
    'SuperAdministrator': UserTypeEnum.SUPER_ADMINISTRATOR,
    'Administrator': UserTypeEnum.ADMINISTRATOR,
    'Teacher': UserTypeEnum.TEACHER,
    'Student': UserTypeEnum.STUDENT
};

export const userTypeReverseMap: { [key: number]: string } = {
    [UserTypeEnum.SUPER_ADMINISTRATOR]: 'SuperAdministrator',
    [UserTypeEnum.ADMINISTRATOR]: 'Administrator',
    [UserTypeEnum.TEACHER]: 'Teacher',
    [UserTypeEnum.STUDENT]: 'Student'
};

export function getUserTypeId(userType: string): number | undefined {
    return userTypeMap[userType];
}