import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "../../permission/domain/permission.model";
import { UserType } from "../../userType/domain/user-type.model";

@Entity('permission_user_type')
export class PermissionUserType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_type_id: number

    @Column()
    permission_id: number

    @Column()
    created_at: Date

    @Column({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    deleted_at: Date

    @ManyToOne(() => Permission, permission => permission.id)
    @JoinColumn({ name: 'permission_id' })
    permission: Permission

    @ManyToOne(() => UserType, userType => userType.id)
    @JoinColumn({ name: 'user_type_id' })
    user_type: UserType
}