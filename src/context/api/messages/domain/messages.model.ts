import { Exclude } from "class-transformer";
import { UUID } from "crypto";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('messages')
export class Messages {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @Column()
    message: string;

    @CreateDateColumn()
    @Exclude()
    created_at: Date

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date

    @DeleteDateColumn()
    @Exclude()
    deleted_at: Date
}