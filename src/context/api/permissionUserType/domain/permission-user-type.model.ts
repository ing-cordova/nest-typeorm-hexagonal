import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "../../permission/domain/permission.model";
import { UserType } from "../../userType/domain/user-type.model";
import { Exclude } from "class-transformer";
import { UUID } from "crypto";

@Entity('permission_user_type')
export class PermissionUserType {
    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column()
    user_type_id: UUID

    @Column()
    permission_id: UUID

    @Column()
    @Exclude()
    created_at: Date

    @Column({ nullable: true })
    @Exclude()
    updated_at: Date

    @Column({ nullable: true })
    @Exclude()
    deleted_at: Date

    @ManyToOne(() => Permission, permission => permission.id)
    @JoinColumn({ name: 'permission_id' })
    permission: Permission

    @ManyToOne(() => UserType, userType => userType.id)
    @JoinColumn({ name: 'user_type_id' })
    user_type: UserType
}