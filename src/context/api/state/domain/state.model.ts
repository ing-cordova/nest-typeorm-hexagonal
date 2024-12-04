import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Country } from "../../country/domain/country.model";
import { Exclude } from "class-transformer";

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

    @CreateDateColumn({ nullable: true })
    @Exclude()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    @Exclude()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    @Exclude()
    deleted_at: Date;

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country
}