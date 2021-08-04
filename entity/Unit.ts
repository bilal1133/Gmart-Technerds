import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {UnitsLanguage} from "./UnitLanguage";

@Entity({ name: "Units" })
export class Units {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    active: number

    @OneToMany(type => UnitsLanguage, unitLanguage => unitLanguage.unit, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'lang' })
    lang: UnitsLanguage
}