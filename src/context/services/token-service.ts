import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from '../api/authUser/domain/authuser.model';

const configService = new ConfigService();

export const generateToken = (payload: any) => {
    const token = jwt.sign(
        payload,
        configService.get<string>('TOKEN_SECRET'),
        {
            expiresIn: configService.get<string>('TOKEN_EXPIRATION'),
        }
    );

    return token;
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, configService.get<string>('TOKEN_SECRET'));
};

export const generateAppToken = (authUser: AuthUser) => {
    return generateToken({user_type: 'SUPER_ADMIN', username: authUser.username});
 }