import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    @Exclude()
    created_at: Date;
    
    @Column({ nullable: true })
    @Exclude()
    updated_at: Date;
    
    @Column({ nullable: true })
    @Exclude()
    deleted_at: Date;

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country
}