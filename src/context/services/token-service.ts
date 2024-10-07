import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

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