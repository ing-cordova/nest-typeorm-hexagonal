import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Region } from "../../region/domain/region.model";

@Entity("sub_region")
export class SubRegion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  region_id: number;

  @Column()
  name: string;

  @CreateDateColumn({ nullable: true })
  @Exclude()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  @Exclude()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deleted_at: Date;

  @ManyToOne(() => Region, (region) => region.id)
  @JoinColumn({ name: "region_id" })
  region: Region;
}
