import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import {UsersAdmin} from "./UserAdmin";
import {Orders} from "./Orders";

@Entity({ name: "DeliveryBoyOrderTrack" })
export class DeliveryBoyOrderTrack {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UsersAdmin, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user', referencedColumnName: 'id' })
    user: UsersAdmin

    @ManyToOne(type => Orders, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order', referencedColumnName: 'id' })
    order: Orders

    @Column("decimal", { precision: 10, scale: 4 })
    latitude: number

    @Column("decimal", { precision: 10, scale: 4 })
    longtitude: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date
}