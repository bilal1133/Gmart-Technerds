import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Language } from './Language';
import {ProductExtraGroups} from "./ProductExtraGroups";

@Entity({ name: "ProductExtraGroupsLanguage" })
export class ProductExtraGroupsLanguage {
    @ManyToOne(type => ProductExtraGroups, extra => extra.id, { nullable: false, primary: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'extraGroup', referencedColumnName: 'id' })
    extraGroup: ProductExtraGroups

    @ManyToOne(type => Language, { nullable: false, primary: true })
    @JoinColumn({ name: 'lang', referencedColumnName: 'id' })
    lang: Language

    @Column('varchar')
    name: string
}