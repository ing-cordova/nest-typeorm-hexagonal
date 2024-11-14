import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { decryptPassword, encryptPassword } from "../../../../services/password-service";
import { HttpException } from "@nestjs/common";
import { UserProfileRepository } from "../../domain/userprofile.repository";
import { UserProfile } from "../../domain/userprofile.model";

@Injectable()
export class TypeOrmUserProfileRepository extends UserProfileRepository {
    constructor(
        @InjectRepository(UserProfile)
        private readonly repository: Repository<UserProfile>,
    ) {
        super();
    }

    async create(authUser: UserProfile): Promise<void> {
        const foundUser = await this.repository.findOne({
            where: [{ username: authUser.username }, { email: authUser.email }],
        });

        if (foundUser) throw new HttpException("User already exists", 409)

        await this.repository.save(authUser);
    }

    async findByUsername(username: string): Promise<UserProfile | null> {
        return await this.repository.findOne({
            where: { username },
            relations: ['userType', 'country', 'state'],
        })
    }

    async findAll(): Promise<UserProfile[]> {
        return await this.repository.find({
            relations: ['userType', 'country', 'state'],
        });
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async updateById(id: number, authUser: UserProfile): Promise<UserProfile> {
        authUser.id = id;
        await this.repository.update(id, authUser);
        return await this.repository.findOne({ where: { id } }) as UserProfile;
    }

    async login(email: string, password: string): Promise<UserProfile | null> {
        const authUser = await this.repository.findOne({ where: { email }, relations: ['userType', 'country', 'state'], });
        if (authUser && decryptPassword(password, authUser.password)) return authUser;
        return null;
    }

    async changePassword(username: string, password: string): Promise<void> {
        const hasTemporalPassword = await this.repository.findOne({ where: { username, is_temporal_password: true } });

        if (!hasTemporalPassword) throw new HttpException("You already changed your password", 404);
        await this.repository.update({ username }, { password: encryptPassword(password), is_temporal_password: false });
    }
}