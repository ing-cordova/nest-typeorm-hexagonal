import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import exp from 'constants';
import { UserProfile } from '../api/userProfile/domain/userprofile.model';

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

export const generateAppToken = (userProfile: UserProfile) => {
    return generateToken(
        {
            user_type: userProfile.userType.id,
            username: userProfile.username,
            location: userProfile.country.name,
            // itp: Is Temporal Password
            itp: userProfile.is_temporal_password
        }
    );
};

export const generateAppRefreshToken = () => {
    return generateRefreshToken({ type: 'refresh' });
}

export const generateAPPTokenAndRefreshToken = (userProfile: UserProfile) => {
    return {
        token: generateAppToken(userProfile),
        refreshToken: generateAppRefreshToken()
    }
}