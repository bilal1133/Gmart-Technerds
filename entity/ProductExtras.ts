import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {ProductExtrasLanguage} from "./ProductExtrasLanguage";
import {Shops} from "./Shops";
import {Products} from "./Products";
import {ProductExtraGroups} from "./ProductExtraGroups";

@Entity({ name: "ProductExtras" })
export class ProductExtras {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'double',
        precision: 22,
        scale: 2
    })
    price: number

    @Column('varchar')
    image_url: string

    @Column('varchar')
    background_color: string

    @Column('int')
    active: number

    @OneToMany(type => ProductExtrasLanguage, extraLanguage => extraLanguage.extras, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'lang' })
    lang: ProductExtrasLanguage

    @ManyToOne(type => Shops, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop', referencedColumnName: 'id' })
    shop: Shops

    @ManyToOne(type => Products, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    product: Products

    @ManyToOne(type => ProductExtraGroups, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'extraGroup', referencedColumnName: 'id' })
    extraGroup: ProductExtraGroups
}