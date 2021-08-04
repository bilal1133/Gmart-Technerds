import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne} from "typeorm";
import {Shops} from "./Shops";
import {UsersClient} from "./UserClient";
import {OrderStatus} from "./OrderStatus";
import {PaymentStatus} from "./PaymentStatus";
import {PaymentMethod} from "./PaymentsMethods";
import {OrderDetails} from "./OrdersDetail";
import {UserAddresses} from "./UserAddresses";
import {UsersAdmin} from "./UserAdmin";

@Entity({name: "Orders"})
export class Orders {
    @PrimaryGeneratedColumn()
    id: number

    @Column('double')
    tax: number

    @Column('double')
    delivery_fee: number

    @Column('double')
    total_sum: number

    @Column('double')
    total_discount: number

    @Column('int')
    id_user: number

    @ManyToOne(type => UsersClient, userClient => userClient.addresses, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'user'})
    user: UsersClient

    @ManyToOne(type => UsersAdmin, usersAdmin => usersAdmin.id, {nullable: true, onDelete: 'CASCADE'})
    @JoinColumn({name: 'delivery_boy'})
    delivery_boy: UsersAdmin

    @Column('int', {nullable: true})
    delivery_mark: number

    @Column('int', {nullable: true})
    id_review: number

    @Column('int')
    id_delivery_address: number

    @Column('int')
    id_shop: Shops

    @Column('varchar')
    delivery_date: string

    @Column('text')
    comment: string

    @Column('tinyint')
    active: number

    @Column('tinyint')
    type: number

    @Column('text', {nullable: true})
    checklist: string

    @Column('datetime')
    created_at: Date

    @Column('datetime', {nullable: true})
    updated_at: Date

    @ManyToOne(type => OrderStatus, {nullable: false})
    @JoinColumn({name: 'order_status', referencedColumnName: 'id'})
    order_status: OrderStatus

    @ManyToOne(type => PaymentStatus, {nullable: false})
    @JoinColumn({name: 'payment_status', referencedColumnName: 'id'})
    payment_status: PaymentStatus

    @ManyToOne(type => PaymentMethod, {nullable: false})
    @JoinColumn({name: 'payment_method', referencedColumnName: 'id'})
    payment_method: PaymentMethod

    @OneToMany(type => OrderDetails, order_detail => order_detail.order, {onDelete: "SET NULL"})
    @JoinColumn({name: 'order_detail'})
    order_detail: OrderDetails

    @ManyToOne(type => UserAddresses, address => address.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'delivery_address'})
    delivery_address: UserAddresses

    @ManyToOne(type => Shops, shop => shop.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'shops'})
    shops: Shops
}