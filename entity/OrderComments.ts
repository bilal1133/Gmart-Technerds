import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Orders } from "./Orders";
import {UsersClient} from "./UserClient";

@Entity({ name: "OrderComments" })
export class OrderComments {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    comment_text: string

    @Column('int')
    id_user: number

    @Column('int')
    id_order: number

    @ManyToOne(type => UsersClient, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    user: UsersClient

    @OneToOne(type => Orders, order => order.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order' })
    order: Orders

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date

}