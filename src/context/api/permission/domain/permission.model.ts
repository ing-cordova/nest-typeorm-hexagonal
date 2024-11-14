import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    can: string

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