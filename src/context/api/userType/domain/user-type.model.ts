import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_type')
export class UserType {
    @PrimaryGeneratedColumn()
    id: number;

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