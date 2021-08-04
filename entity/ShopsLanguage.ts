import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Language } from "./Language";
import { Shops } from "./Shops";

@Entity({ name: "ShopsLanguage" })
export class ShopsLanguage {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Language, { nullable: false, primary: true })
    @JoinColumn({ name: 'id_lang', referencedColumnName: 'id' })
    id_lang: Language

    @ManyToOne(type => Shops, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_shop', referencedColumnName: 'id' })
    id_shop: Shops

    @Column('varchar')
    name: string

    @Column('text')
    description: string

    @Column('text')
    info: string

    @Column('varchar')
    address: string
}