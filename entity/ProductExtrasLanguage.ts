import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Language } from './Language';
import {ProductExtras} from "./ProductExtras";

@Entity({ name: "ProductExtrasLanguage" })
export class ProductExtrasLanguage {
    @ManyToOne(type => ProductExtras, extra => extra.id, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'extras', referencedColumnName: 'id' })
    extras: ProductExtras

    @ManyToOne(type => Language, { nullable: false, primary: true })
    @JoinColumn({ name: 'lang', referencedColumnName: 'id' })
    lang: Language

    @Column('varchar')
    name: string

    @Column('text')
    description: string
}