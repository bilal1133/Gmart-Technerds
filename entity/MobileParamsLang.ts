import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import {Language} from "./Language";
import {MobileParams} from "./MobileParams";

@Entity({ name: "MobileParamsLang" })
export class MobileParamsLang {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @ManyToOne(type => MobileParams, { nullable: false, primary: true })
    @JoinColumn({ name: 'id_param', referencedColumnName: 'id' })
    id_param: Language

    @ManyToOne(type => Language, { nullable: false, primary: true })
    @JoinColumn({ name: 'id_lang', referencedColumnName: 'id' })
    id_lang: Language
}