import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Units } from './Unit';
import { Language } from './Language';

@Entity({ name: "UnitsLanguage" })
export class UnitsLanguage {
    @ManyToOne(type => Units, unit => unit.id, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'unit', referencedColumnName: 'id' })
    unit: Units

    @ManyToOne(type => Language, { nullable: false, primary: true })
    @JoinColumn({ name: 'lang', referencedColumnName: 'id' })
    lang: Language

    @Column('varchar')
    name: string
}