import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "../../shared/dependency-injection/injectable";

@Injectable()
export class JwtAuthRefreshGuard extends AuthGuard('jwt-refresh') { }