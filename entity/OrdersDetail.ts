import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import {Orders} from "./Orders";
import {Products} from "./Products";
import {UsersClient} from "./UserClient";
import {Coupon} from "./Coupon";

@Entity({name: "OrderDetails"})
export class OrderDetails {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Orders, order => order.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'order'})
    order: Orders

    @Column('int')
    quantity: number

    @Column({
        type: 'double',
        precision: 22,
        scale: 2,
        default: 0
    })
    discount: number

    @Column({
        type: 'double',
        precision: 22,
        scale: 2,
        default: 0,
        nullable: true
    })
    coupon_amount: number

    @ManyToOne(type => Coupon, coupon => coupon.id, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({name: 'coupon'})
    coupon: Coupon

    @Column({
        type: 'double',
        precision: 22,
        scale: 2
    })
    price: number

    @Column('int')
    id_product: number

    @Column('tinyint')
    is_replaced: number

    @Column('tinyint')
    is_replacement_product: number

    @ManyToOne(type => Products, product => product.id, {nullable: true, onDelete: 'CASCADE'})
    @JoinColumn({name: 'replace_product'})
    replace_product: Products

    @ManyToOne(type => Products, product => product.id, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'product'})
    product: Products
}