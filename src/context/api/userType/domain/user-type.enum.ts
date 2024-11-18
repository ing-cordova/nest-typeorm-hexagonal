export enum UserTypeEnum {
    SUPER_ADMINISTRATOR = 1,
    ADMINISTRATOR = 2,
    STUDENT = 3,
    TEACHER = 4
}

const userTypeMap: { [key: string]: number } = {
    'SuperAdmin': UserTypeEnum.SUPER_ADMINISTRATOR,
    'Administrator': UserTypeEnum.ADMINISTRATOR,
    'Student': UserTypeEnum.STUDENT,
    'Teacher': UserTypeEnum.TEACHER
};

export const userTypeReverseMap: { [key: number]: string } = {
    [UserTypeEnum.SUPER_ADMINISTRATOR]: 'SuperAdmin',
    [UserTypeEnum.ADMINISTRATOR]: 'Administrator',
    [UserTypeEnum.STUDENT]: 'Student',
    [UserTypeEnum.TEACHER]: 'Teacher'
};

export function getUserTypeId(userType: string): number | undefined {
    return userTypeMap[userType];
}