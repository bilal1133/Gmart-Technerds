import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PaymentStatus" })
export class PaymentStatus {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string

    @Column('varchar')
    class: string

    @Column('varchar')
    icon: string

    @Column('int')
    active: number

    @Column('datetime')
    created_at: Date

    @Column('datetime', { nullable: true })
    updated_at: Date
}