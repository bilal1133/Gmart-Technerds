import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Language" })
export class Language {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar')
    short_name: string

    @Column('varchar')
    image_url: string

    @Column('tinyint')
    active: number
}