import {Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Products} from "./Products";
import {Coupon} from "./Coupon";

@Entity({ name: "CouponProducts" })
export class CouponProducts {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Coupon, coupon => coupon.id)
    @JoinColumn({name: 'coupon'})
    coupon: Coupon

    @ManyToOne(type => Products, product => product.id)
    @JoinColumn({name: 'product'})
    product: Products
}