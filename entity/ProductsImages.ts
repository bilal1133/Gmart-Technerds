import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Products } from './Products';

@Entity({ name: "ProductsImages" })
export class ProductsImages {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Products, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_product', referencedColumnName: 'id' })
    id_product: Products

    @Column('varchar')
    image_url: string

    @Column('int')
    main: number

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date
}