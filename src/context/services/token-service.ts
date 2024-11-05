import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from '../api/authUser/domain/authuser.model';
import exp from 'constants';

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

export const generateRefreshToken = (payload: any) => {
    const refreshToken = jwt.sign(
        payload,
        configService.get<string>('REFRESH_TOKEN_SECRET'),
        {
            expiresIn: configService.get<string>('REFRESH_TOKEN_EXPIRATION'),
        }
    );

    return refreshToken;
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, configService.get<string>('TOKEN_SECRET'));
};

export const generateAppToken = (authUser: AuthUser) => {
    return generateToken(
        {
            user_type: authUser.userType.name,
            username: authUser.username,
            location: authUser.country.name,
            has_temporal_password: authUser.is_temporal_password
        }
    );
};

export const generateAppRefreshToken = () => {
    return generateRefreshToken({ type: 'refresh' });
}