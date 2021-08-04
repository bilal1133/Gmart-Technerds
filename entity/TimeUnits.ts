import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import {Shops} from "./Shops";

@Entity({ name: "TimeUnits" })
export class TimeUnits {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('tinyint')
    active: number

    @Column('int')
    sort: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date

    @ManyToOne(type => Shops, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop', referencedColumnName: 'id' })
    shop: Shops
}