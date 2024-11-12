import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "../../shared/dependency-injection/injectable";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-access') { }