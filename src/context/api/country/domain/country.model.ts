import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Region } from "../../region/domain/region.model";
import { SubRegion } from "../../subRegion/domain/sub-region.model";

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

    @Column({nullable: true})
    region_id: number;

    @Column({nullable: true})
    sub_region_id: number;

    @Column()
    currency: string;

    @Column()
    currency_name: string;

    @Column()
    currency_symbol: string;

    @Column()
    nationality: string;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    @Exclude()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    @Exclude()
    deleted_at: Date;

    @ManyToOne(() => Region, region => region.id)
    @JoinColumn({ name: 'region_id' })
    region: Region;

    @ManyToOne(() => SubRegion, sub_region => sub_region.id)
    @JoinColumn({ name: 'sub_region_id' })
    sub_region: SubRegion;
}