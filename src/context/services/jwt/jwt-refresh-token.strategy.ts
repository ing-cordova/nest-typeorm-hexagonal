import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "../../shared/dependency-injection/injectable";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';


const config = new ConfigService();

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
        });
    }

    async validate(payload: any) { return payload; }
}