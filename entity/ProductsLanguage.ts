import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Products } from './Products';
import { Language } from './Language';

@Entity({ name: "ProductsLanguage" })
export class ProductsLanguage {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Products, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_product', referencedColumnName: 'id' })
    id_product: Products

    @ManyToOne(type => Language, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_lang', referencedColumnName: 'id' })
    id_lang: Language

    @Column('varchar')
    name: string

    @Column('text')
    description: string
}