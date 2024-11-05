import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserType } from '../../userType/domain/user-type.model';
import { Country } from '../../country/domain/country.model';
import { State } from '../../State/domain/state.model';

@Entity('auth_user')
export class AuthUser {
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
  email_verified_at: Date;

  @Column({ unique: true })
  username: string;

  @Column()
  country_id: number

  @Column()
  state_id: number

  @Column()
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  is_temporal_password: boolean;

  @Column()
  accepted_terms: boolean;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
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

export class RequestAuthUser {
  username: string;
  email: string;
}
