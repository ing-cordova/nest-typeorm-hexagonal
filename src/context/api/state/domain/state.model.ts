import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "../../country/domain/country.model";

@Entity('state')
export class State {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    state_code: string

    @Column()
    country_id: number

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country

    @Column()
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;

    @Column({ nullable: true })
    deleted_at: Date;
}