import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import { Products } from "./Products";
import {Shops} from "./Shops";

@Entity({ name: "Brands" })
export class Brands {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar')
    image_url: string

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date

    @OneToMany(type => Products, products => products.brand)
    @JoinColumn({ name: 'products' })
    products: Products

    @ManyToOne(type => Shops, { nullable: false })
    @JoinColumn({ name: 'id_shop', referencedColumnName: 'id' })
    id_shop: Shops
}