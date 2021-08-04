import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Roles } from './Roles'
import { Permissions } from './Permissions'

@Entity({ name: "RolesPermissions" })
export class RolesPermissions {
    @ManyToOne(type => Roles, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_role', referencedColumnName: 'id' })
    id_role: Roles

    @ManyToOne(type => Permissions, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_permission', referencedColumnName: 'id' })
    id_permission: Permissions

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date
}