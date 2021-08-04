import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {BannersLanguage} from "./BannerLanguage";
import {Shops} from "./Shops";
import {BannerProducts} from "./BannerProducts";

@Entity({name: "Banners"})
export class Banners {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    image_url: string

    @Column('varchar')
    title_color: string

    @Column('varchar')
    button_color: string

    @Column('varchar')
    indicator_color: string

    @Column('varchar')
    background_color: string

    @Column('varchar')
    position: string

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', {nullable: true})
    updated_at: Date

    @OneToMany(type => BannersLanguage, bannerLang => bannerLang.id_banner, {nullable: false, onDelete: 'SET NULL'})
    @JoinColumn({name: 'lang'})
    lang: BannersLanguage

    @OneToMany(type => BannerProducts, bannerProducts => bannerProducts.id_banner, {nullable: false, onDelete: 'SET NULL'})
    @JoinColumn({name: 'products'})
    products: BannerProducts

    @ManyToOne(type => Shops, shop => shop.id, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'shop'})
    shop: Shops

    @Column('int')
    id_shop: number
}