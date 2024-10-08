import { InjectRepository } from "@nestjs/typeorm";
import { AuthUserRepository } from "../../domain/authuser.repository";
import { AuthUser } from "../../domain/authuser.model";
import { Repository } from "typeorm";
import { Injectable } from "../../../shared/dependency-injection/injectable";
import { decryptPassword } from "../../../services/password-service";
import { HttpException } from "@nestjs/common";

@Injectable()
export class TypeOrmAuthUserRepository extends AuthUserRepository {
    constructor(
        @InjectRepository(AuthUser)
        private readonly repository: Repository<AuthUser>,
    ) {
        super();
    }

    async create(authUser: AuthUser): Promise<void> {
        const foundUser = await this.repository.findOne({
            where: [{ username: authUser.username }, { email: authUser.email }],
        });

        if (foundUser) throw new HttpException("User already exists", 409)

        await this.repository.save(authUser);
    }

    async findByUsername(username: string): Promise<AuthUser | null> {
        return await this.repository.findOne({
            where: { username },
        })
    }

    async findAll(): Promise<AuthUser[]> {
        return await this.repository.find();
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async updateById(id: number, authUser: AuthUser): Promise<AuthUser> {
        authUser.id = id;
        await this.repository.update(id, authUser);
        return await this.repository.findOne({ where: { id } }) as AuthUser;
    }

    async login(username: string, password: string): Promise<AuthUser | null> {
        const authUser = await this.repository.findOne({ where: { username } });
        if (authUser && decryptPassword(password, authUser.password)) return authUser;
        return null;
    }
}