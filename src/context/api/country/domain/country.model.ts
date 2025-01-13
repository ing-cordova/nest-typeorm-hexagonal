import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('country')
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    iso2: string;

    @Column({ unique: true })
    iso3: string;

    @Column()
    phone_code: string;

    @Column()
    region: string;

    @Column()
    sub_region: string

    @Column()
    currency: string;

    @Column()
    currency_name: string;

    @Column()
    currency_symbol: string;

    @Column()
    nationality: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    @Exclude()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    @Exclude()
    deleted_at: Date;
}