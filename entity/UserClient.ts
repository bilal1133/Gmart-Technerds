import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {UserAddresses} from "./UserAddresses";

@Entity({name: "UsersClient"})
export class UsersClient {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', {nullable: true})
    social_id: string

    @Column('varchar')
    name: string

    @Column('varchar')
    surname: string

    @Column('varchar', {nullable: true})
    phone: string

    @Column('varchar', {nullable: true})
    email: string

    @Column('varchar', {nullable: true})
    image_url: string

    @Column('int')
    auth_type: number

    @Column('varchar', {nullable: true})
    password: string

    @Column('varchar')
    token: string

    @Column('tinyint', {
        nullable: true,
        default: 1
    })
    device_type: number

    @Column('tinyint')
    active: number

    @OneToMany(type => UserAddresses, address => address.user, {nullable: true, onDelete: 'CASCADE'})
    @JoinColumn({name: 'addresses'})
    addresses: UserAddresses

    @Column('datetime')
    created_at: Date

    @Column('datetime', {nullable: true})
    updated_at: Date
}