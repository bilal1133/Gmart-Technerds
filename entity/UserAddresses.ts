import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import {UsersClient} from "./UserClient";

@Entity({ name: "UserAddresses" })
export class UserAddresses {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    id_user: number

    @Column('text')
    address: string

    @Column("decimal", { precision: 10, scale: 4 })
    latitude: number

    @Column("decimal", { precision: 10, scale: 4 })
    longtitude: number

    @Column('tinyint')
    default: number

    @Column('tinyint')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date

    @ManyToOne(type => UsersClient, userClient => userClient.addresses, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'user'})
    user: UsersClient
}