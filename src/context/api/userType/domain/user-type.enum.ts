export enum UserTypeEnum {
    SUPER_ADMINISTRATOR = 1,
    ADMINISTRATOR = 2,
    DOCTOR = 3,
    ENFEREMERO = 4,
    CAJERO = 5,
}

const userTypeMap: { [key: string]: number } = {
    'SuperAdmin': UserTypeEnum.SUPER_ADMINISTRATOR,
    'Administrator': UserTypeEnum.ADMINISTRATOR,
    'Doctor': UserTypeEnum.DOCTOR,
    'Enfermero': UserTypeEnum.ENFEREMERO,
    'Cajero': UserTypeEnum.CAJERO
};

export const userTypeReverseMap: { [key: number]: string } = {
    [UserTypeEnum.SUPER_ADMINISTRATOR]: 'SuperAdmin',
    [UserTypeEnum.ADMINISTRATOR]: 'Administrator',
    [UserTypeEnum.DOCTOR]: 'Doctor/a',
    [UserTypeEnum.ENFEREMERO]: 'Enfermero/a',
    [UserTypeEnum.CAJERO]: 'Cajero/a'
};

export function getUserTypeId(userType: string): number | undefined {
    return userTypeMap[userType];
}