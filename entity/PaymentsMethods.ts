import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PaymentMethod" })
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date
}