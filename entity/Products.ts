import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Brands } from "./Brands";
import { Categories } from './Categories';
import { ProductComments } from "./ProductComments";
import { ProductsImages } from "./ProductsImages";
import {ProductsLanguage} from "./ProductsLanguage";
import {Shops} from "./Shops";
import {Units} from "./Unit";

@Entity({ name: "Products" })
export class Products {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    quantity: number

    @Column('int')
    pack_quantity: number

    @Column({
        type: 'double',
        precision: 22,
        scale: 2
    })
    weight: number

    @Column({
        type: 'double',
        precision: 22,
        scale: 2
    })
    price: number

    @Column('int')
    id_unit: number

    @Column({
        type: 'double',
        precision: 22,
        scale: 2
    })
    discount_price: number

    @Column('tinyint')
    show_type: number

    @Column('int')
    id_category: number

    @ManyToOne(type => Units, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'unit', referencedColumnName: 'id' })
    unit: Units

    @ManyToOne(type => Categories, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category', referencedColumnName: 'id' })
    category: Categories

    @ManyToOne(type => Shops, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'shop', referencedColumnName: 'id' })
    shop: Shops

    @ManyToOne(type => Brands, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'brand', referencedColumnName: 'id' })
    brand: Brands

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date

    @OneToMany(type => ProductsImages, productImage => productImage.id_product)
    @JoinColumn({ name: 'images' })
    images: ProductsImages

    @OneToMany(type => ProductsLanguage, productsLang => productsLang.id_product)
    @JoinColumn({ name: 'lang' })
    lang: ProductsLanguage

    @OneToMany(type => ProductComments, productsComment => productsComment.id_product)
    @JoinColumn({ name: 'comment' })
    comment: ProductComments
}