import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Banners } from './Banners';
import { Language } from './Language';

@Entity({ name: "BannersLanguage" })
export class BannersLanguage {
    @ManyToOne(type => Banners, banner => banner.id, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_banner', referencedColumnName: 'id' })
    id_banner: Banners

    @ManyToOne(type => Language, { nullable: false, primary: true })
    @JoinColumn({ name: 'id_lang', referencedColumnName: 'id' })
    id_lang: Language

    @Column('varchar')
    title: string

    @Column('text')
    description: string

    @Column('varchar')
    button_text: string
}