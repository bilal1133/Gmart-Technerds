import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Shops } from './Shops';
import {CouponLanguage} from "./CouponLanguage";
import {CouponProducts} from "./CouponProducts";

@Entity({ name: "Coupon" })
export class Coupon {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @ManyToOne(type => Shops, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop', referencedColumnName: 'id' })
    shop: Shops

    @OneToMany(type => CouponLanguage, couponLang => couponLang.coupon, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'lang' })
    lang: CouponLanguage

    @OneToMany(type => CouponProducts, couponProducts => couponProducts.coupon, {nullable: false, onDelete: 'SET NULL'})
    @JoinColumn({name: 'products'})
    products: CouponProducts

    @Column('tinyint')
    discount_type: number

    @Column({
        type: 'double',
        precision: 22,
        scale: 2
    })
    discount: number

    @Column('tinyint')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date
}