import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    currency: string;

    @Column()
    @Exclude()
    created_at: Date;

    @Column({ nullable: true })
    @Exclude()
    updated_at: Date;

    @Column({ nullable: true })
    @Exclude()
    deleted_at: Date;
}