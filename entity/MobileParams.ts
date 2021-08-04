import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import {MobileParamsLang} from "./MobileParamsLang";

@Entity({ name: "MobileParams" })
export class MobileParams {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar')
    defaultText: string

    @OneToMany(type => MobileParamsLang, params => params.id_param)
    @JoinColumn({ name: 'params_lang' })
    params_lang: MobileParamsLang
}