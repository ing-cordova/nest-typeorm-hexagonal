import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { decryptPassword, encryptPassword } from "../../../../services/password-service";
import { HttpException } from "@nestjs/common";
import { UserProfileRepository } from "../../domain/userprofile.repository";
import { UserProfile } from "../../domain/userprofile.model";
import { UUID } from "crypto";

@Injectable()
export class TypeOrmUserProfileRepository extends UserProfileRepository {
    constructor(
        @InjectRepository(UserProfile)
        private readonly repository: Repository<UserProfile>,
    ) {
        super();
    }

    async create(userProfile: UserProfile): Promise<void> {
        const foundUser = await this.repository.findOne({
            where: [{ username: userProfile.username }, { email: userProfile.email }],
        });

        if (foundUser) throw new HttpException("There's already an account with this email or username", 409)

        await this.repository.save(userProfile);
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

    async findAllWithPagination(page: number, limit: number): Promise<{ data: UserProfile[], total: number, nextPage: number | null, prevPage: number | null, limit: number }> {
        const [userProfiles, total] = await this.repository.findAndCount({
            relations: ['userType', 'country', 'state'],
            skip: (page - 1) * limit,
            take: limit,
        });

        const nextPage = (page * limit) < total ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
        return { data: userProfiles, total, nextPage, prevPage, limit };
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async softDeleteById(id: number): Promise<void> {
        await this.repository.softDelete(id);
    }

    async updateById(id: UUID, userProfile: Partial<UserProfile>): Promise<UserProfile> {
        await this.repository.update(id, userProfile);
        return await this.repository.findOne({ where: { id } }) as UserProfile;
    }

    async login(identifier: string, password: string): Promise<UserProfile | null> {
        let userProfile: UserProfile | null = null;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(identifier)) {
            userProfile = await this.repository.findOne({ where: { email: identifier }, relations: ['userType', 'country', 'state'] });
        } else {
            userProfile = await this.repository.findOne({ where: { username: identifier }, relations: ['userType', 'country', 'state'] });
        }

        if (userProfile && decryptPassword(password, userProfile.password)) {
            return userProfile;
        }

        return null;
    }

    async changePassword(username: string, password: string): Promise<void> {
        const hasTemporalPassword = await this.repository.findOne({ where: { username, is_temporal_password: true } });

        if (!hasTemporalPassword) throw new HttpException("You already changed your password", 404);
        await this.repository.update({ username }, { password: encryptPassword(password), is_temporal_password: false });
    }
}