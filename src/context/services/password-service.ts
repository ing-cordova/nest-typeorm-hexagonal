import * as bycript from 'bcrypt';

export const encryptPassword = (password: string) => {
    return bycript.hashSync(password, 10);
};

export const decryptPassword = (password: string, hash: string) => {
    return bycript.compareSync(password, hash);
}