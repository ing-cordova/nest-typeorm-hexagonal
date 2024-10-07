import { InjectRepository } from "@nestjs/typeorm";
import { AuthUserRepository } from "../../domain/authuser.repository";
import { AuthUser } from "../../domain/authuser.model";
import { Repository } from "typeorm";
import { Injectable } from "../../../shared/dependency-injection/injectable";

@Injectable()
export class TypeOrmAuthUserRepository extends AuthUserRepository {
    constructor(
        @InjectRepository(AuthUser)
        private readonly repository: Repository<AuthUser>,
    ) {
        super();
    }

    async create(authUser: AuthUser): Promise<void> {
        await this.repository.save(authUser);
    }

    async findByUsername(username: string): Promise<AuthUser | null> {
        return await this.repository.findOne({
            where: { username },})
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
}