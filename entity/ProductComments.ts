import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Products } from "./Products";
import {UsersClient} from "./UserClient";

@Entity({ name: "ProductComments" })
export class ProductComments {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    comment_text: string

    @Column('int')
    star: number

    @Column('int')
    id_user: number

    @Column('int')
    id_product: number

    @ManyToOne(type => UsersClient, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user', referencedColumnName: 'id' })
    user: UsersClient

    @ManyToOne(type => Products, product => product.comment, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product'})
    product: Products

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date
}