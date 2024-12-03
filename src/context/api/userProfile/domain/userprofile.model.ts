import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserType } from '../../userType/domain/user-type.model';
import { Country } from '../../country/domain/country.model';
import { State } from '../../state/domain/state.model';

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_type_id: number

  @Column()
  first_name: string;

  @Column({ nullable: true })
  second_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  second_last_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  email_verified_at: Date;

  @Column({ unique: true })
  username: string;

  @Column()
  country_id: number

  @Column({ nullable: true })
  state_id: number

  @Column({ nullable: true })
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  is_temporal_password: boolean;

  @Column({ default: false })
  accepted_terms: boolean;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at: Date;

  @ManyToOne(() => UserType, userType => userType.id)
  @JoinColumn({ name: 'user_type_id' })
  userType: UserType;

  @ManyToOne(() => Country, country => country.id)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @ManyToOne(() => State, state => state.id)
  @JoinColumn({ name: 'state_id' })
  state: State;
}

export class RequestUserProfile {
  username: string;
  email: string;
}
