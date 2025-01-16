import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_type')
export class UserType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column()
    @Exclude()
    created_at: Date;

    @Column({ nullable: true })
    @Exclude()
    updated_at: Date;

    @Column({ nullable: true })
    @Exclude()
    deleted_at: Date;
}