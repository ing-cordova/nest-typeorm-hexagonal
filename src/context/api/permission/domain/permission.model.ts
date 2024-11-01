import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    can: string

    @Column()
    created_at: Date
    
    @Column({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    deleted_at: Date
}	