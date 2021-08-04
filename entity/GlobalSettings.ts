import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import {Shops} from "./Shops";

@Entity({ name: "GlobalSettings" })
export class GlobalSettings {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar')
    key: string

    @Column('varchar')
    value: string

    @Column('varchar')
    default: string

    @ManyToOne(type => Shops, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop', referencedColumnName: 'id' })
    shop: Shops
}