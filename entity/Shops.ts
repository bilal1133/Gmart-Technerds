import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { ShopsLanguage } from "./ShopsLanguage";

@Entity({ name: "Shops" })
export class Shops {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    logo_url: string

    @Column('varchar')
    backimage_url: string

    @Column('int')
    delivery_type: number

    @Column('double')
    delivery_price: number

    @Column('int')
    delivery_range: number

    @Column('double')
    tax: number

    @Column('double')
    admin_percentage: number

    @Column("decimal", { precision: 10, scale: 4 })
    latitude: number

    @Column("decimal", { precision: 10, scale: 4 })
    longtitude: number

    @Column('varchar')
    phone: string

    @Column('varchar')
    mobile: string

    @Column('tinyint')
    show_type: number

    @Column('tinyint')
    is_closed: number

    @Column('tinyint')
    active: number

    @Column('time')
    open_hour: Date

    @Column('time')
    close_hour: Date

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date

    @OneToMany(type => ShopsLanguage, shopsLang => shopsLang.id_shop)
    @JoinColumn({ name: 'lang' })
    lang: ShopsLanguage
}