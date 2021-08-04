import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Roles" })
export class Roles {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('tinyint')
    active: number
}