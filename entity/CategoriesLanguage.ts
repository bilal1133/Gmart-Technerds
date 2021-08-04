import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Categories } from './Categories';
import { Language } from './Language';

@Entity({ name: "CategoriesLanguage" })
export class CategoriesLanguage {
    @ManyToOne(type => Categories, category => category.lang, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_category', referencedColumnName: 'id' })
    id_category: Categories

    @ManyToOne(type => Language, { nullable: false, primary: true })
    @JoinColumn({ name: 'id_lang', referencedColumnName: 'id' })
    id_lang: Language

    @Column('varchar')
    name: string
}