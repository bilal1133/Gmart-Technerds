import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CategoriesLanguage } from "./CategoriesLanguage";
import { Products } from "./Products";
import { Shops } from './Shops';

@Entity({ name: "Categories" })
export class Categories {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Shops, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop', referencedColumnName: 'id' })
    shop: Shops

    @Column('int')
    parent: number

    @Column('varchar')
    image_url: string

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date

    @OneToMany(type => CategoriesLanguage, categoryLang => categoryLang.id_category, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'lang' })
    lang: CategoriesLanguage

    @OneToMany(type => Products, product => product.id_category)
    @JoinColumn({ name: 'product' })
    product: Products
}