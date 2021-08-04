import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Permissions" })
export class Permissions {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar')
    url: string

    @Column('tinyint')
    type: number
}