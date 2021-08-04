import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {ProductExtraGroupsLanguage} from "./ProductExtraGroupsLanguage";

@Entity({ name: "ProductExtraGroups" })
export class ProductExtraGroups {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    active: number

    @OneToMany(type => ProductExtraGroupsLanguage, extraLanguage => extraLanguage.extraGroup, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'lang' })
    lang: ProductExtraGroupsLanguage
}