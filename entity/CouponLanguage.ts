import {Entity, Column, ManyToOne, JoinColumn} from "typeorm";
import {Coupon} from "./Coupon";
import {Language} from "./Language";

@Entity({ name: "CouponLanguage" })
export class CouponLanguage {
    @ManyToOne(type => Coupon, coupon => coupon.id)
    @JoinColumn({name: 'coupon'})
    coupon: Coupon

    @Column('text')
    description: string

    @ManyToOne(type => Language, { nullable: false, primary: true })
    @JoinColumn({ name: 'id_lang', referencedColumnName: 'id' })
    lang: Language
}