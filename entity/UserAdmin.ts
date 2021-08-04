import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {Roles} from './Roles';
import {Shops} from "./Shops";

@Entity({name: "UsersAdmin"})
export class UsersAdmin {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar')
    surname: string

    @Column('varchar')
    image_url: string

    @Column('varchar', {nullable: true})
    address: string

    @Column('varchar')
    email: string

    @Column('varchar')
    phone: string

    @Column('varchar')
    password: string

    @Column('varchar')
    token: string

    @Column('tinyint')
    active: number

    @Column('int')
    id_role: number

    @Column('int', {nullable: true, default: 1})
    offline: number

    @ManyToOne(type => Roles, {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({name: 'role', referencedColumnName: 'id'})
    role: Roles

    @Column('int')
    id_shop: number

    @ManyToOne(type => Shops, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({name: 'shop', referencedColumnName: 'id'})
    shop: Shops

    @Column('datetime')
    created_at: Date

    @Column('datetime', {nullable: true})
    updated_at: Date
}