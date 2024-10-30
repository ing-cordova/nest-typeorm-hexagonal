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
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;

    @Column({ nullable: true })
    deleted_at: Date;
}