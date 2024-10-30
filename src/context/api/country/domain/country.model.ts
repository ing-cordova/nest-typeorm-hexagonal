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
    flag: string;

    @Column()
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;

    @Column({ nullable: true })
    deleted_at: Date;
}