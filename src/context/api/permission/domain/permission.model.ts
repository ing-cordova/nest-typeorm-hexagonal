import { Exclude } from "class-transformer";
import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column()
    can: string

    @Column()
    description: string

    @Column()
    @Exclude()
    created_at: Date
    
    @Column({ nullable: true })
    @Exclude()
    updated_at: Date

    @Column({ nullable: true })
    @Exclude()
    deleted_at: Date
}	